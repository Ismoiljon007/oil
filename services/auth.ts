const baseUrl = "https://oilchange.iteachpython.uz";

export default {
  login(username: string, password: string) {
    const formdata: any = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    return $fetch(`${baseUrl}/login`, {
      method: "POST",
      body: formdata,
    });
  },
};
