const WorkflowTemplate = require('../models/WorkflowTemplate');
const Workflow = require('../models/Workflow');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// Template Controllers
exports.getTemplates = asyncHandler(async (req, res, next) => {
  const templates = await WorkflowTemplate.find().sort('name');
  res.status(200).json({ success: true, count: templates.length, data: templates });
});

exports.createTemplate = asyncHandler(async (req, res, next) => {
  const template = await WorkflowTemplate.create(req.body);
  res.status(201).json({ success: true, data: template });
});

exports.updateTemplate = asyncHandler(async (req, res, next) => {
  const template = await WorkflowTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!template) return next(new ErrorResponse('Template not found', 404));
  res.status(200).json({ success: true, data: template });
});

exports.deleteTemplate = asyncHandler(async (req, res, next) => {
  const template = await WorkflowTemplate.findById(req.params.id);
  if (!template) return next(new ErrorResponse('Template not found', 404));
  await template.deleteOne();
  res.status(200).json({ success: true, data: {} });
});

// Workflow Controllers
exports.getWorkflows = asyncHandler(async (req, res, next) => {
  const workflows = await Workflow.find().populate('template', 'name type').sort('name');
  res.status(200).json({ success: true, count: workflows.length, data: workflows });
});

exports.createWorkflow = asyncHandler(async (req, res, next) => {
  const workflow = await Workflow.create(req.body);
  res.status(201).json({ success: true, data: workflow });
});

exports.updateWorkflow = asyncHandler(async (req, res, next) => {
  const workflow = await Workflow.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!workflow) return next(new ErrorResponse('Workflow not found', 404));
  res.status(200).json({ success: true, data: workflow });
});

exports.deleteWorkflow = asyncHandler(async (req, res, next) => {
  const workflow = await Workflow.findById(req.params.id);
  if (!workflow) return next(new ErrorResponse('Workflow not found', 404));
  await workflow.deleteOne();
  res.status(200).json({ success: true, data: {} });
});