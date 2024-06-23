
import { renderCurrentAsset } from "../components/current-asset";
import { store, removeHistory } from "../store";

const $sectionHistory = document.querySelector(".history");
const $sectionCategory = document.querySelector(".categories");

export function initHistoryList() {
  renderHistoryList();
  renderCategories();
  addHistoryListEventListener();
}

function addHistoryListEventListener() {
  $sectionHistory.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.className.includes("delete-button")) return;

    const { dateid, itemid } = element.dataset;

    const isSuccess = removeHistory(dateid, itemid);
    if (!isSuccess) {
      alert("소비내역 삭제에 실패했습니다.");
      return;
    }

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
  renderCategories();
}

export function renderHistoryList() {
  $sectionHistory.innerHTML = store.dateList
    .map(({ date, id: dateId }) => {
      const detail = store.detailList[dateId];
      if (!detail?.length) return "";

      return `<article class="history-per-day">
      <p class="history-date">${date}</p>

      ${detail
        .sort((a,b)=> b.id - a.id)
        .map(({description, category, amount, fundsAtTheTime,createAt,id})=>{
          const time = new Date(createAt).toLocaleTimeString('ko-kr',{timeStyle:"short",hourCycle:"h24"});

        return `<section class="history-item">
        <section class="history-item-column">
          <div class="create-at">${time}</div>
          <div class="history-detail">
            <div class="history-detail-row history-detail-title">
              <p>${description}</p>
            </div>
            <div class="history-detail-row history-detail-subtitle">
              <p>${category}</p>
              <p>
                ${amount.toLocaleString()}
                <span>원</span>
              </p>
            </div>
          </div>
          <div class="delete-section" >
            <button class="delete-button" data-dateid=${dateId} data-itemid=${id}>🗑</button>
          </div>
        </section>
        <section class="history-item-caption">
          <p>
            <span>남은 자산</span>
            <span>${fundsAtTheTime}</span>
            <span>원</span>
          </p>
        </section>
      </section>`;
      }).join("")}

    </article>`;
    })
    .join("");
}

export function renderCategories() {
  $sectionCategory.innerHTML = 
  `<article class = "cate">
      <div class = "cate-title">카테고리별 지출 금액</div>

      <section class = "cate-detail">
          <div>
            <span class = "cate-name"> CAFE ${store.categories["cafe"]}원 </span>
          </div>
          <div>
            <span class = "cate-name"> FOOD ${store.categories["food"]}원 </span>
          </div>
          <div>
            <span class = "cate-name"> CULTURE ${store.categories["culture"]}원 </span>
          </div>
          <div>
            <span class = "cate-name"> LIFE ${store.categories["life"]} </span>
          </div>
        </section>

      </article>`
}
    

    