import { httpService } from "@/api/request";
interface LoginResp {
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresTime: string;
  }
export class LoginService{   
      static login() {            
          const api= (data) =>httpService.instance({
            url: '/api/auth/login',
            timeout: 10000,
            method: 'post',
            data
          })     
          return  httpService.useRequest<LoginResp>(api);
      }
      
}