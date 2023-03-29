import { httpService } from "@/api/request";

export class UserService{   
      static getUserlist() {            
          const api= (params) =>httpService.instance({
            url: '/api/user/list',
            timeout: 10000,
            method: 'get',
            params
          })     
          return  httpService.usePageRequest<any[]>(api);
      }
      static addUser() {
        const api= (data) =>httpService.instance({
          url: '/api/user/add',
          timeout: 10000,
          method: 'post',
          data:data
        })     
        return  httpService.useRequest<any[]>(api);
      }
      static updateUser() {
        const api= (data) =>httpService.instance({
          url: '/api/user/update',
          timeout: 10000,
          method: 'post',
          data:data
        })     
        return  httpService.useRequest<any[]>(api);
      }

      static changeUserStatus(){
        const api=(userId,params)=>httpService.instance({
          url:`/api/user/change-status/${userId}`,
          params:params,
          method:"post",
        })
        return  httpService.useRequest<any[]>(api);
      }

      static resetUserPassword(){
        const api=(userId)=>httpService.instance({
          url:`/api/user/reset-password/${userId}`,
          method:"post",
        })
        return  httpService.useRequest<any[]>(api);
      }

      static deleteUser(){
        const api=(userId)=>httpService.instance({
          url:`/api/user/${userId}`,
          method:"delete",
        })
        return  httpService.useRequest<any[]>(api);
      }
}