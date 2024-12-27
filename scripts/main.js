import { world, system } from "@minecraft/server";

console.log("Script started!");

// アイテムを削除する関数
function cleanItems() {
    console.log("Cleaning items...");
    try {
        const overworld = world.getDimension("overworld");
        let itemsRemoved = 0;

        // アイテムを検索して削除
        const entities = overworld.getEntities({ type: "minecraft:item" });
        for (const entity of entities) {
            entity.kill();  // エンティティを削除
            itemsRemoved++;
        }

        console.log(`Found and deleted ${itemsRemoved} items.`);

        // 結果を通知
        if (itemsRemoved > 0) {
            overworld.runCommand(`tellraw Removed ${itemsRemoved} items from the ground!`);
        }
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

// 1分ごとの自動クリーン
system.runInterval(() => {
    console.log("Running scheduled clean...");
    cleanItems();
}, 600); // 600 ticks = 30 seconds