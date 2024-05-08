import DealService from "../services/DealService.js";

class DealController {
  async updateDealFields(req, res) {
    const deal = await DealService.updateDealFields(
      req.query.id,
      req.query.userId,
      req.query.companyId,
      req.body
    );
    res.json(deal);
  }

  async getDealFields(req, res) {
    const deal = await DealService.getDealFields(
      req.query.id,
      req.query.userId,
      req.query.companyId
    );
    res.json(deal);
  }
}

export default new DealController();
