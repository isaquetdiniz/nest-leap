import { tags, servers, securitySchemes } from '@/main/docs/helpers';

import {
  authPaths,
  userPaths,
  regionPaths,
  typeOperatorPaths,
  callMotivePaths,
  areaPaths,
  typeRequesterPaths,
  requesterPaths,
  messagePaths,
  channelPaths,
  callPaths,
  attendancePaths,
  availableTimePaths,
  documentTypePaths,
  documentPaths,
  requesterStatusPaths,
  reportConfigPaths,
  dashboardPaths,
} from '@/main/docs/paths';

import {
  loginSchema,
  firstAccessSchema,
  regionSchema,
  userSchema,
  typeOperatorSchema,
  callMotiveSchema,
  areaSchema,
  updateUserSchema,
  updateAreaSchema,
  typeRequesterSchema,
  requesterSchema,
  updateRequesterSchema,
  messageSchema,
  messageFileSchema,
  channelSchema,
  callSchema,
  updateCallSchema,
  attendanceSchema,
  updateAttendanceSchema,
  documentTypeSchema,
  documentSchema,
  updateDocumentSchema,
  requesterStatusSchema,
  reportConfigSchema,
  updateReportConfigSchema,
} from '@/main/docs/schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Portal do Morador API',
    version: '1.0.4',
    description: 'API',
    contact: {
      email: 'tech@loomi.com.br',
    },
  },
  servers,
  tags,
  paths: {
    ...authPaths,
    ...typeOperatorPaths,
    ...regionPaths,
    ...areaPaths,
    ...userPaths,
    ...typeRequesterPaths,
    ...requesterPaths,
    ...callMotivePaths,
    ...messagePaths,
    ...channelPaths,
    ...callPaths,
    ...attendancePaths,
    ...availableTimePaths,
    ...documentTypePaths,
    ...documentPaths,
    ...requesterStatusPaths,
    ...reportConfigPaths,
    ...dashboardPaths,
  },
  schemas: {
    user: userSchema,
    updateUser: updateUserSchema,
    firstAccess: firstAccessSchema,
    login: loginSchema,
    region: regionSchema,
    typeOperator: typeOperatorSchema,
    callMotive: callMotiveSchema,
    area: areaSchema,
    updateArea: updateAreaSchema,
    typeRequester: typeRequesterSchema,
    requester: requesterSchema,
    updateRequester: updateRequesterSchema,
    message: messageSchema,
    messageFile: messageFileSchema,
    channel: channelSchema,
    call: callSchema,
    updateCall: updateCallSchema,
    attendance: attendanceSchema,
    updateAttendance: updateAttendanceSchema,
    documentType: documentTypeSchema,
    document: documentSchema,
    updateDocument: updateDocumentSchema,
    requesterStatus: requesterStatusSchema,
    reportConfig: reportConfigSchema,
    updateReportConfig: updateReportConfigSchema,
  },
  components: {
    securitySchemes,
  },
};
