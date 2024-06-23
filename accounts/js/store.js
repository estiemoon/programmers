/**
 * store 
 * 
 * categories[
 *  {category1 : 1000},
 *  {category2 : 2000},
 *  ...
 * ]
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
  export const store = {
    currentFunds: 0,
  
    isFirstEdit: true,
    todayId: 1,

    categories : {
      "cafe" : 0,
      "food" : 0,
      "culture" : 0,
      "life" : 0
    },
  
    dateList: [
      {
        id: 1,
        date: new Date().toLocaleDateString(),
      },
    ],
    detailList: {},
  };
  
  export function updateStorage() {
    sessionStorage.setItem("store", JSON.stringify(store));
  }
  
  export function initStore() {
    const storage = sessionStorage.getItem("store");
    if (!storage) updateStorage();
  
    const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
      JSON.parse(storage);
  
    store.currentFunds = currentFunds;
    store.isFirstEdit = isFirstEdit;
    store.dateList = dateList;
    store.detailList = detailList;
    store.todayId = todayId;
  }
  
  export function addNewHistory(newHistory) {
    try {
      
      if (store.detailList[store.todayId]){
        store.detailList[store.todayId].push(newHistory); 
      } else {
        store.detailList[store.todayId] = [newHistory]; 
  
      }
      store.currentFunds -= newHistory.amount;

      const currCategory = newHistory.category;
      store.categories[currCategory] += newHistory.amount;
  
      updateStorage();
      return true;
  
    } catch (error) {
      alert(error);
      return false;
    }
  }
  
  export function removeHistory(dateId, itemId) {
    try {
      store.detailList[dateId] = store.detailList[dateId].filter(({id,amount,category})=>{
        if (id == Number(itemId)) {
          store.currentFunds += amount;
          store.categories[category] -= amount;
        }
        return id !== Number(itemId);
      });
  
      updateStorage();
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  }
  