const baseUrl = "http://34.125.54.253";

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
