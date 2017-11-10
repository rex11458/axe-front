
 export function getFunds(req, res) {
    const { productCode } = req.body;
    if (productCode == "000001") {
      res.json([
        {
          value: "01",
          label: "华夏基金",
          children: [
            {
              value: "000001",
              label: "华夏成长"
            },
            {
              value: "000002",
              label: "华夏大盘"
            }
          ]
        }
      ]);
    } else {
      res.send([
        {
          value: "02",
          label: "易方达基金",
          children: [
            {
              value: "000011",
              label: "易方达混合"
            },
            {
              value: "000012",
              label: "易方达货币"
            }
          ]
        }
      ]);
    }
  }

