const OpenAI = require('openai');
const SandboxRunner = require('./sandboxRunner');
// const { ESLint } = require('eslint'); // ❌ chưa dùng → comment

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class AIGrader {
  static async gradeCoding(submission, question, io, room) {
    const testCases = question.testCases || [];
    const sandboxId = submission._id;
    
    if (io) io.to(room).emit('grade:progress', { type: 'sandbox', status: 'running' });
    
    // Run sandbox
    const sandboxResults = await SandboxRunner.runCode(testCases, question.answer, sandboxId, io);
    
    if (!sandboxResults.success) {
      return { functionality: 0, feedback: `Sandbox error: ${sandboxResults.error}` };
    }

    // Calculate functionality (50%)
    const funcScore = (sandboxResults.testsPassed / sandboxResults.totalTests) * 50;

    // Code quality (20% ESLint)
    const qualityScore = sandboxResults.eslintScore * 0.2;

    // Efficiency (20%)
    let effScore = 20;
    if (sandboxResults.bigOScore?.includes('O(n^2)')) effScore *= 0.5;
    else if (sandboxResults.bigOScore?.includes('O(n log n)')) effScore *= 0.8;

    // ⚠️ FIX 1: dùng code của user thay vì answer
    const aiPrompt = `Review this JavaScript code for best practices (0-10 score):
Code: ${submission.code}
Tests: ${sandboxResults.testsPassed}/${sandboxResults.totalTests}
ESLint: ${sandboxResults.eslintScore}/100
Big-O: ${sandboxResults.bigOScore}

Respond ONLY with JSON: {"score": number, "feedback": "brief comment"}`;

    try {
      // ⚠️ FIX 2: dùng API mới
      const aiResponse = await openai.responses.create({
        model: "gpt-4o-mini",
        input: aiPrompt,
      });

      const text = aiResponse.output[0].content[0].text;
      const aiResult = JSON.parse(text);

      const bestScore = aiResult.score;

      return {
        functionality: funcScore,
        codeQuality: qualityScore,
        efficiency: effScore,
        bestPractices: bestScore,
        sandboxResults,
        aiFeedback: aiResult.feedback,
        total: funcScore + qualityScore + effScore + bestScore
      };

    } catch (error) {
      return {
        functionality: funcScore,
        codeQuality: qualityScore,
        efficiency: effScore,
        bestPractices: 0,
        sandboxResults,
        aiFeedback: `AI error: ${error.message}`,
        total: funcScore + qualityScore + effScore
      };
    }
  }

  static gradeMCQ(answers, questions) {
    let score = 0;
    const feedback = [];

    questions.forEach((q, i) => {
      if (q.type === 'mcq' && answers[i]?.answer === q.correctAnswer) {
        score += q.points;
        feedback.push(`MCQ${i+1}: ✅`);
      }
    });

    return { score, feedback: feedback.join(' | ') };
  }
}

module.exports = AIGrader;