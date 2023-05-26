    //* 来自软工lab4的满减计算 
    // 商品列表，包括商品的活动ID、价格和数量
    let commodities = [
    { activityId: 1, price: 45, commodityNum: 2 },
    { activityId: -1, price: 55, commodityNum: 1 },
    { activityId: 2, price: 60, commodityNum: 3 },
    { activityId: 1, price: 80, commodityNum: 1 },
    // ...
    ];

    // 活动满减策略，键为活动ID，值为满减金额和满足条件的价格
    let activityDiscounts = {
    1: { threshold: 100, discount: 50 },
    2: { threshold: 200, discount: 100 },
    // ...
    };

    // 按照活动ID对商品进行分组
    let activities = {};
    commodities.forEach(commodity => {
    let { activityId } = commodity;
    if (!activities[activityId]) {
        activities[activityId] = [];
    }
    activities[activityId].push(commodity);
    });

    // 对每个活动内的商品进行满减计算
    for (let activityId in activities) {
    let commodities = activities[activityId];
    let total = commodities.reduce((sum, commodity) => sum + commodity.price * commodity.commodityNum, 0);
    let { threshold, discount } = activityDiscounts[activityId] || {};
    let discountTimes = threshold ? Math.floor(total / threshold) : 0;  // 满减可以叠加的次数
    let discountSum = 0;

    commodities.forEach((commodity, i) => {
        if (i < commodities.length - 1) {
        let ratio = commodity.price * commodity.commodityNum / total;
        let reductionAmount = discount * ratio;
        reductionAmount = Math.round(reductionAmount * 100) / 100;  // 保留两位小数
        discountSum += reductionAmount;
        let paidAmount = commodity.price * commodity.commodityNum - reductionAmount;
        paidAmount = Math.round(paidAmount * 100) / 100;  // 保留两位小数
        commodity.paidAmount = paidAmount;
        commodity.reductionAmount = reductionAmount;
        } else {
        let reductionAmount = discount - discountSum;
        reductionAmount = Math.round(reductionAmount * 100) / 100;  // 保留两位小数
        let paidAmount = commodity.price * commodity.commodityNum - reductionAmount;
        paidAmount = Math.round(paidAmount * 100) / 100;  // 保留两位小数
        commodity.paidAmount = paidAmount;
        commodity.reductionAmount = reductionAmount;
        }
    });
    }

    // 输出每个商品的预估到手价和满减金额
    commodities.forEach((commodity, i) => {
    console.log(`商品${i + 1}的预估到手价为：${commodity.paidAmount}，满减金额为：${commodity.reductionAmount}`);
    });