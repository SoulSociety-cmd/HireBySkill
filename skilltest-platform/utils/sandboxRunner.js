const Docker = require('dockerode');
const docker = new Docker();

class SandboxRunner {
  static async runCode(testCases, code, submissionId, io = null) {
    const containerName = `sandbox-${submissionId}-${Date.now()}`;
    
    try {
      // Pull sandbox image if needed
      await docker.pull('skilltest-platform-sandbox', { tag: 'latest' });
      
      // Create container
      const container = await docker.createContainer({
        Image: 'sandbox',
        name: containerName,
        HostConfig: {
          Memory: 512 * 1024 * 1024, // 512MB
          NanoCpus: 500000000, // 0.5 CPU
          AutoRemove: true,
          NetworkMode: 'none' // Isolated
        },
        Env: ['NODE_ENV=production']
      });

      await container.start();

      // Send code and testCases via HTTP POST to container port 3000
      const payload = { code, testCases };
      
      // Exec curl-like command in container (since no docker.sock)
      const exec = await container.exec({
        Cmd: ['sh', '-c', `echo '${JSON.stringify(payload)}' | nc localhost 3000`],
        AttachStdout: true,
        AttachStderr: true
      });

      const stream = await exec.start();
      let output = '';
      stream.on('data', chunk => output += chunk.toString());

      // Wait for completion (timeout 10s)
      await new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject(new Error('Timeout')), 10000);
        stream.on('end', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      const results = JSON.parse(output);
      
      if (io) {
        io.to(`grading-${submissionId}`).emit('sandbox:complete', results);
      }

      return {
        success: true,
        ...results,
        runtimeMs: Date.now() // approx
      };

    } catch (error) {
      if (io) io.to(`grading-${submissionId}`).emit('sandbox:error', error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = SandboxRunner;

