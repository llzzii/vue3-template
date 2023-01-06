import { UserInfo } from '@/types/store';
import { defineStore } from 'pinia';
import { store } from '@/stores';
import { localCache } from '@/utils/storageCache';
export enum RoleEnum {
  SUPER = 'super',
  USER = 'user',
  ADMIN = 'admin',
}

interface UserState {
  userInfo: Nullable<UserInfo>;
  accessToken?: string;
  refreshToken?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  isLock?: boolean;
}
const USER_LOCAL_LOCK_KEY = 'USER_LOCAL_LOCK_KEY__';
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    accessToken: localCache().get("USER_ACCESS_TOKEN_KEY__"),
    refreshToken: localCache().get("USER_REFRESH_TOKEN_KEY__"),
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    isLock: localCache().get(USER_LOCAL_LOCK_KEY),
  }),
  getters: {
    getLockStatus(): boolean {
      return !!this.isLock;
    },
    getAccessToken(): string|undefined {
      return this.accessToken;
    },
    getRefreshToken(): string|undefined {
      return this.refreshToken;
    }
  },
  actions: {
    setLockStatus(isLock) {
      this.isLock = isLock;

      localCache().set(USER_LOCAL_LOCK_KEY, isLock);
    },
    setAccessToken(accessToken){
      console.log("🚀 ~ file: user.ts:55 ~ setAccessToken ~ accessToken", accessToken)
      this.accessToken = accessToken;
      localCache().set('USER_ACCESS_TOKEN_KEY__', accessToken);
    },
     setRefreshToken(refreshToken){
      this.refreshToken = refreshToken;
      localCache().set('USER_REFRESH_TOKEN_KEY__', refreshToken);
    },
    loginOut(){
      this.accessToken = undefined;
      this.refreshToken = undefined;
      localCache().clear();
    }
  },
});

// Need to be used outside the setup,否则路由拦截器中无法使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
