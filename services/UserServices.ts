type Options = Parameters<typeof useOFetch>[1];

export class UserServices {
  static async getUser(options?: Options) {
    return useOFetch("https://randomuser.me/api", {
      ...options,
      transform: () => {
        return { name: 'asd' }
      }
    });
  }

  static async updateUser(options?: Options) {
    const response = await useOFetch("/api/update", {
      method: "POST",
      ...options
    });

    return response;
  }
}
