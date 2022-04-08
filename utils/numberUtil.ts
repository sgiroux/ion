
export const formatNumber = (value:any, numDecimalSpots:number) => {
  return Number.parseFloat(value).toFixed(numDecimalSpots);
}
