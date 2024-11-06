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
    const animationContainer = document.getElementById("animation-container");
    const guardImg = document.getElementById("guard-img");
    const treasureBoxImg = document.getElementById("treasure-box-img");
    const fullScreenImage = document.getElementById("full-screen-image");

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

        // 显示古庙图片作为背景
        animationContainer.style.backgroundImage = "url('image1.jpeg')";
        addMessage("你到达了神秘的古庙...");

        // 停留2秒
        await new Promise(resolve => setTimeout(resolve, 2000));

        const puzzleResult = await TreasureMap.solvePuzzle();
        addMessage(puzzleResult);

        // 保持古庙背景不变并继续游戏

        // 处理守卫事件
        try {
            const box = await TreasureMap.searchTemple(decoded);
            addMessage(box);
        } catch (guardEncounter) {
            addMessage("糟糕!遇到了神庙守卫!");
            guardImg.style.display = "block"; // 显示守卫图片
            await new Promise(resolve => setTimeout(resolve, 2000)); // 停留2秒
            guardImg.style.display = "none";

            // 任务失败，全屏显示失败图片
            fullScreenImage.style.backgroundImage = "url('image5.jpg')";
            fullScreenImage.style.display = "block";
            throw new Error("任务失败: 遇到了神庙守卫!");
        }

        // 显示宝箱图片
        treasureBoxImg.style.display = "block";
        const treasure = await TreasureMap.openTreasureBox();
        addMessage(treasure);

        // 成功，全屏显示宝藏图片
        fullScreenImage.style.backgroundImage = "url('image4.jpg')";
        fullScreenImage.style.display = "block";
    } catch (error) {
        addMessage(error.message);
    } finally {
        // 隐藏所有图片和背景，重置页面
        animationContainer.style.backgroundImage = "none";
        guardImg.style.display = "none";
        treasureBoxImg.style.display = "none";

        // 2秒后隐藏全屏图片
        setTimeout(() => {
            fullScreenImage.style.display = "none";
        }, 2000);
    }
}

// 绑定按钮事件
document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("messages").innerHTML = ""; // 清空消息
    findTreasure();
});
