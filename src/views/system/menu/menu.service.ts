import { httpService } from "@/api/request";

export class MenuService{   
      static getMenulist() {            
          const api= (params) =>httpService.instance({
            url: '/api/menu/list',
            timeout: 10000,
            method: 'get',
            params
          })     
          return  httpService.usePageRequest<any[]>(api);
      }
      static addMenu() {
        const api= (data) =>httpService.instance({
          url: '/api/menu/add',
          timeout: 10000,
          method: 'post',
          data:data
        })     
        return  httpService.useRequest<any[]>(api);
      }
      static updateMenu() {
        const api= (data) =>httpService.instance({
          url: '/api/menu/update',
          timeout: 10000,
          method: 'post',
          data:data
        })     
        return  httpService.useRequest<any[]>(api);
      }

      static changeMenuStatus(){
        const api=(menuId,params)=>httpService.instance({
          url:`/api/menu/change-status/${menuId}`,
          params:params,
          method:"post",
        })
        return  httpService.useRequest<any[]>(api);
      }

      static deleteMenu(){
        const api=(menuId)=>httpService.instance({
          url:`/api/menu/${menuId}`,
          method:"delete",
        })
        return  httpService.useRequest<any[]>(api);
      }
}