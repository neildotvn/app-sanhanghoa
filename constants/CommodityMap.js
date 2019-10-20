import { commodityNames } from "./Strings";

export const commodityMap = [
    {
        name: commodityNames.CA_PHE,
        ice: [15, 16, 17, 18],
        nyb: [3, 4, 5, 6],
        iceTerms: ["11/19", "01/20", "03/20", "05/20"],
        nybTerms: ["12/19", "03/20", "05/20", "07/20"],
        code: 5
    },
    {
        name: commodityNames.CA_PHE_ARABICA,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.CA_PHE_ROBUSTA,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.COTTON,
        nyb: [9, 10, 11, 12],
        nybTerms: ["12/19", "03/20", "05/20", "07/20"],
        code: 9
    },
    {
        name: commodityNames.CA_CAO,
        ice: [34, 35],
        nyb: [36, 37],
        iceTerms: ["12/19", "03/20"],
        nybTerms: ["12/19", "03/20"],
        code: 11
    },
    {
        name: commodityNames.CAO_SU,
        nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"],
        code: 10
    },
    {
        name: commodityNames.DUONG,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    }, //
    {
        name: commodityNames.DAU_TUONG,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.DAU_DAU_TUONG,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.KHO_DAU_TUONG,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.LUA_MI,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.NGO,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.QUANG_SAT,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.BACH_KIM,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.BAC,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.DONG,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.DAU_WTI,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.DAU_LUU_HUYNH,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.XANG_PHA_CHE,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.KHI_TU_NHIEN,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.DAU_THO,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    },
    {
        name: commodityNames.DAU_THO_BRENT,
        // nyb: [42, 43, 44, 45],
        nybTerms: ["11/19", "12/19", "01/20", "02/20"]
    }
];

export const orderProductMap = [
    {
        name: commodityNames.CA_PHE,
        productCode: 5
    },
    {
        name: commodityNames.COTTON,
        productCode: 9
    },
    {
        name: commodityNames.CAO_SU,
        productCode: 10
    },
    {
        name: commodityNames.CA_CAO,
        productCode: 11
    }
];

export const getRowDataWithCodeAndExchange = (prices, code, exchange) => {
    let thisProduct;
    for (const product of commodityMap) {
        if (product.code == code) {
            thisProduct = product;
        }
    }
    let rowIndex = 0;
    for (let index = 0; index < thisProduct.iceTerms.length; index++) {
        const mappedTerm = `ICE ${thisProduct.iceTerms[index]}`;
        if (mappedTerm.trim() === exchange.trim()) {
            rowIndex = thisProduct.ice[index];
        }
    }
    for (let index = 0; index < thisProduct.nybTerms.length; index++) {
        const mappedTerm = `NYB ${thisProduct.iceTerms[index]}`;
        if (mappedTerm.trim() === exchange.trim())
            rowIndex = thisProduct.nyb[index];
    }
    return prices[rowIndex].vs;
};

export const getProductNameFromCode = code => {
    for (const product of commodityMap) {
        if (product.code == code) {
            return product.name;
        }
    }
};
