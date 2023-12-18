function calculateFormula() {
    let name = document.getElementById('compound-name').value.trim().toLowerCase();
    let formula = parseCompound(name);

    if (formula) {
        document.getElementById('formula-result').innerHTML = 'Formula: ' + formula;
    } else {
        document.getElementById('formula-result').innerHTML = 'Compound not found or name too complex.';
    }
}

function parseCompound(name) {
    let root = parseRoot(name);
    let suffix = parseSuffix(name);

    if (root && suffix) {
        return constructFormula(root, suffix);
    } else {
        return null;
    }
}

function parseRoot(name) {
    const rootMap = {
        'meth': 1, 'eth': 2, 'prop': 3, 'but': 4,
        'pent': 5, 'hex': 6, 'hept': 7, 'oct': 8,
        'non': 9, 'dec': 10
    };

    for (let root in rootMap) {
        if (name.startsWith(root)) {
            return rootMap[root];
        }
    }
    return null;
}

function parseSuffix(name) {
    if (name.includes('ane')) {
        return 'ane';
    } else if (name.includes('ene')) {
        return 'ene';
    } else if (name.includes('yne')) {
        return 'yne';
    } else if (name.includes('ol')) {
        return 'ol';
    } else if (name.includes('thiol')) {
        return 'thiol';
    } else if (name.includes('ether')) {
        return 'ether';
    } else if (name.includes('al')) {
        return 'al';
    } else if (name.includes('one')) {
        return 'one';
    } else if (name.includes('oic acid')) {
        return 'oic acid';
    } else {
        return null;
    }
}

function constructFormula(root, suffix) {
    let carbonCount = root;
    let hydrogenCount;

    switch (suffix) {
        case 'ane':
            hydrogenCount = 2 * carbonCount + 2;
            break;
        case 'ene':
            hydrogenCount = 2 * carbonCount;
            break;
        case 'yne':
            hydrogenCount = 2 * carbonCount - 2;
            break;
        case 'ol':
            hydrogenCount = 2 * carbonCount + 1;
            return `C${carbonCount}H${hydrogenCount}OH`;
        case 'al':
            hydrogenCount = 2 * carbonCount - 1;
            return `C${carbonCount}H${hydrogenCount}CHO`;
        case 'one':
            hydrogenCount = 2 * carbonCount - 2;
            return `C${carbonCount}H${hydrogenCount}CO`;
        case 'oic acid':
            hydrogenCount = 2 * carbonCount;
            return `C${carbonCount}H${hydrogenCount}COOH`;
        
        default:
            return `Complex ether formula calculation needed`;
    }
}



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('find-formula').addEventListener('click', calculateFormula);
});
