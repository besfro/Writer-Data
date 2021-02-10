function changeCoin(coins, amount) {
  let len = coins.length
  let result = []

  while(len-- > 0) {
    const item = {
      coin: coins[len],
      total: 0,
      count: 0
    }

    while(item.total < amount) {
      if (item.total + item.coin > amount) {
        break
      } else {
        item.total += item.coin
        item.count++
      }
    }

    if(total < amount && item < amount) {
      let blance = changeCoin(coins, amount - total)
      if (blance) {
        result.push({
          count: count + blance.count,
          arr: [{ coin: item, count }].concat(blance.arr)
        })
      }
    } else if (total === amount) {
      result.push({
        count: count,
        arr: [{ coin: item, count }]
      })
    }
  }
  return result.sort((a, b) => a.count - b.count).shift()
}

changeCoin([1,2,5], 121)