'use strict';


const ReportJob = require('./model');

const { JobStatus } = require('./enum');

/**
 * @class ExportRepository
 */
class ExportRepository {
  /**
   * Fetch an export job by id
   * @param {number} companyId
   * @param {string} jobId
   * @returns {Promise<boolean>}
   * @memberof ReportExportService
   */
  async getJobById(companyId, jobId) {
    return await ReportJob.findOne({
      company_id: companyId,
      job_id: jobId
    }, { _id: 0, __v: 0 });
  }

  /**
   * Fetch all exported jobs
   * @param {number} companyId
   * @returns {Promise<Array<ReportJob>>}
   * @memberof ReportExportService
   */
  async getJobs(companyId) {
    return await ReportJob.find({
      company_id: companyId
    }, { _id: 0, __v: 0 });
  }

  /**
   * Create export job on redis
   * @param {ExportMessage} data
   * @param {{ data: Array<CallRecord>, columns: Array<string> }} callRecords
   * @returns {Promise<{ status: JobStatus, reportName: string, baseDownloadUrl: string, filter: Object, format: string, payload: Array<CallRecord>, columns: Array<string> }>}
   * @memberof ReportExportService
   */
  async createJob(data) {
    const { jobId, company, filters, status } = data;

    await ReportJob.findOneAndDelete({
      job_id: jobId,
      company_id: company.id,
      status: JobStatus.ERROR
    });

    
    const reportJob = new ReportJob({
      job_id: jobId,
      company_id: company.id,
      report: 'call-statement',
      filters,
      status
    });

    return await reportJob.save();
  }

  /**
   *
   * @param {number} companyId
   * @param {string} jobId
   * @param {{ status: JobStatus, url: string, error: string }} update
   * @memberof ExportRepository
   */
  async updateJob(companyId, jobId, update) {
    return await ReportJob.updateOne({
      company_id: companyId,
      job_id: jobId
    }, update);
  }
}

module.exports = ExportRepository;