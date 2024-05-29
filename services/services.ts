const baseUrl = "http://oilchange.iteachpython.uz";
interface suppliesAdd {
  name: string;
  price: number;
  amount: number;
  amount_type: string;
  category: string;
}
interface activeAdd {
  name: string;
  price: number;
  amount: number;
  amount_type: string;
  category: string;
  status: boolean | string;
  id: number | string;
}
interface addUser {
  name: string | number;
  number: string | number;
}
interface updateUserInterface {
  name: string | number;
  number: string | number;
  id: number | string;
}
interface buyOrderInter {
  product_id: number | string;
  amount: number | string;
  price: number | string;
  order_id: number | string;
}
export default {
  getUserInfo(token: string | null | undefined) {
    return $fetch(`${baseUrl}/users/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getSupplies(token: string | null | undefined) {
    return $fetch(`${baseUrl}/supplies/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteSupplies(token: string | null | undefined, id: string | number) {
    return $fetch(`${baseUrl}/supplies/delete`, {
      method: "DELETE",
      params: {
        ident: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addSupplies(token: string | null | undefined, body: suppliesAdd) {
    return $fetch(`${baseUrl}/supplies/post`, {
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  activeSupplies(token: string | null | undefined, body: activeAdd) {
    return $fetch(`${baseUrl}/supplies/put`, {
      method: "PUT",
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // products
  getProducts(token: string | null | undefined) {
    return $fetch(`${baseUrl}/products/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // orders
  getOrders(token: string | null | undefined) {
    return $fetch(`${baseUrl}/orders/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addOrder(token: string | null | undefined, id: string | number) {
    return $fetch(`${baseUrl}/orders/post`, {
      method: "POST",
      params: {
        customer_id: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateOrder(token: string | null | undefined, id: string | number) {
    return $fetch(`${baseUrl}/orders/put`, {
      method: "PUT",
      params: {
        ident: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteOrder(token: string | null | undefined, id: string | number) {
    return $fetch(`${baseUrl}/orders/delete`, {
      method: "DELETE",
      params: {
        ident: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // trades
  getTrades(token: string | null | undefined) {
    return $fetch(`${baseUrl}/trades/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  buyOrder(token: string | null | undefined, body: buyOrderInter) {
    return $fetch(`${baseUrl}/trades/post`, {
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // customerse
  getCustomers(token: string | null | undefined) {
    return $fetch(`${baseUrl}/customers/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  searchUser(token: string | null | undefined, search: string) {
    return $fetch(`${baseUrl}/customers/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: search,
      },
    });
  },
  addCustomer(token: string | null | undefined, body: addUser) {
    return $fetch(`${baseUrl}/customers/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
  },
  updateCustomer(token: string | null | undefined, body: updateUserInterface) {
    return $fetch(`${baseUrl}/customers/put`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
  },
  deleteCustomer(token: string | null | undefined, id: number | string) {
    return $fetch(`${baseUrl}/customers/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ident: id,
      },
    });
  },
};
