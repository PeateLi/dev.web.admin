import { get, post } from './http'



export const GetTaskLists = p => get('/Utmel/Scheduler/GetSchedule', p);   //任务列表接口

export const StartTasks = p => get('/Utmel/Scheduler/ExEcuteJob'+p);   //立即执行任务接口

export const AddTasks = p => post('/Utmel/Scheduler/AddJobTask', p);   //新增任务接口

export const DeleteTasks = p => post('/Utmel/Scheduler/DeleteJob'+p );   //删除任务接口

export const StopTasks = p => get('/Utmel/Scheduler/PauseJob'+p);   //挂起任务接口

export const ResumeTasks = p => get('/Utmel/Scheduler/ResumeJob'+p);   //恢复任务接口

export const UpTasks = p => post('/Utmel/Scheduler/EditJobCron', p);   //编辑任务接口


export const GetJobsChildDirectory = p => get('/Utmel/Scheduler/GetJobsChildDirectory?IP='+p);   //查询job文件夹


export const GetJobDirectoryDLLs = p => get('/Utmel/Scheduler/GetJobDirectoryDLLs'+p);   //获取目录下的dll文件


export const GetDLLClass = p => get('/Utmel/Scheduler/GetDLLClass'+p);   //从dll中获取类

export const GetClassFuncs = p => get('/Utmel/Scheduler/GetClassFuncs'+p);   //获取函数



export const GetExecuteLog = p => get('/Utmel/Scheduler/GetExecuteLog?page='+p.page+'&limit='+p.limit+'&JobName='+p.JobName+'&JobGroup='+p.JobGroup+'&LogType='+p.LogType);   //执行日志查询接口



export const GetSchedulerLog = p => get('/Utmel/Scheduler/GetSchedulerLog?page='+p.page+'&limit='+p.limit+'&JobName='+p.JobName+'&JobGroup='+p.JobGroup+'&LogType='+p.LogType);   //调度日志查询接口