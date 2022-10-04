export const searchUser = summonerName => {
  const input = document.getElementById('SearchBoxInput');
  input.value = summonerName;
  document.getElementById('SearchBoxButton').click();
};