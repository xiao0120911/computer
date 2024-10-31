class TreasureMap {
  static async getInitialClue() {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve("在古老的图书馆里找到了第一个线索...");
          }, 1000);
      });
  }

  static async decodeAncientScript(clue) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (!clue) {
                  reject("没有线索可以解码!");
              }
              resolve("解码成功!宝藏在一座古老的神庙中...");
          }, 1500);
      });
  }

  static async solvePuzzle() {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const solved = Math.random() < 0.8; // 80% 概率解开谜题
              if (!solved) {
                  reject("糟糕!谜题没有解开!");
              }
              resolve("谜题解开，进入神庙！");
          }, 2000);
      });
  }

  static async searchTemple(location) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const random = Math.random();
              if (random < 0.5) {
                  reject("糟糕!遇到了神庙守卫!");
              }
              resolve("找到了一个神秘的箱子...");
          }, 2000);
      });
  }

  static async openTreasureBox() {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve("恭喜!你找到了传说中的宝藏!");
          }, 1000);
      });
  }
}

async function findTreasure() {
  const messagesContainer = document.getElementById("messages");

  const addMessage = (message) => {
      const msgDiv = document.createElement("div");
      msgDiv.textContent = message;
      msgDiv.className = "message";
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // 滚动到最新消息
  };

  try {
      const clue = await TreasureMap.getInitialClue();
      addMessage(clue);

      const decoded = await TreasureMap.decodeAncientScript(clue);
      addMessage(decoded);

      // 新的情节：解谜
      const puzzleResult = await TreasureMap.solvePuzzle();
      addMessage(puzzleResult);

      const box = await TreasureMap.searchTemple(decoded);
      addMessage(box);

      const treasure = await TreasureMap.openTreasureBox();
      addMessage(treasure);
  } catch (error) {
      addMessage("任务失败: " + error);
  }
}

// 绑定按钮事件
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("messages").innerHTML = ""; // 清空消息
  findTreasure();
});
