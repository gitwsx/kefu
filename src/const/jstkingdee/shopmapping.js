export const tableOption = {
  "border": true,
  "index": true,
  "indexLabel": "序号",
  "stripe": true,
  "menuAlign": "center",
  "align": "center",
  "searchMenuSpan": 6,
  "column": [
    {
      "type":"input",
      "label": "内码",
      "prop": "fid"
    },
    {
      "type":"input",
      "label": '金蝶客户名称',
      "prop": 'fCustName'
    },{
      "type":"input",
      "label": '金蝶客户编码',
      "prop": 'fCustNumber'

    },
    {
      "type":"input",
      "label": '店铺名称',
      "prop": 'fDsptDpName',
      key: 'fDsptDpName'
    },
    {
      "type":"input",
      "label": '店铺编号',
      "prop": 'fDsptDpNumber'
    },
    {
      "type":"input",
      "label": '销售组织名称',
      "prop": 'fSaleOrgName'
    },
    {
      "type":"input",
      "label": '销售组织编码',
      "prop": 'fSaleOrgNumber'
     
    },
    {
      "type":"input",
      "label": '状态',
      "prop": 'fStatus'
    }
  ]
}
