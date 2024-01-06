export const useOFetch = async (
  url: Parameters<typeof useFetch>[0],
  options: Parameters<typeof useFetch>[1],
) => {
  const response = await useFetch(url, {
    ...options,
  });

  const isLoading = computed(() => response.status.value === 'pending');

  return {
    ...response,
    isLoading
  }
}
