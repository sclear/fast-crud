export const api = {
  user: {
    method: "get",
    url: "https://mock.mengxuegu.com/mock/635605c88c53a558a4840c72/test/user-list",
  },
  list: {
    method: "get",
    url: "https://mock.mengxuegu.com/mock/635605c88c53a558a4840c72/test/list",
  },
  createUser: {
    method: "post",
    url: "https://mock.mengxuegu.com/mock/635605c88c53a558a4840c72/test/create-user",
  },
  full: {
    method: "get",
    url: "https://mock.mengxuegu.com/mock/635605c88c53a558a4840c72/test/full",
  },
} as const;
