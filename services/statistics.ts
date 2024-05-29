const baseUrl = "http://oilchange.iteachpython.uz";

export default {
  getStatisitcs(token: string | null | undefined) {
    return $fetch(`${baseUrl}/statistics/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getInComes(token: string | null | undefined) {
    return $fetch(`${baseUrl}/statistics/incomes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getProfit(token: string | null | undefined) {
    return $fetch(`${baseUrl}/statistics/profit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getProductsStatistic(token: string | null | undefined) {
    return $fetch(`${baseUrl}/statistics/total_products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getCustomersStatittic(token: string | null | undefined) {
    return $fetch(`${baseUrl}/statistics/total_customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
