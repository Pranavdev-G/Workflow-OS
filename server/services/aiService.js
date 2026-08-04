// Simulated AI Service for College Project
exports.summarizeRequest = async (title, description) => {
  try {
    const summary = `AI Summary: ${title} involves ${description.substring(0, 50)}...`;
    return summary;
  } catch (error) {
    throw new Error('AI Summarization failed');
  }
};

exports.recommendImprovement = async (workflowType) => {
  try {
    return `AI Recommendation: Consider adding a preliminary review step for ${workflowType} to reduce manager workload.`;
  } catch (error) {
    throw new Error('AI Recommendation failed');
  }
};