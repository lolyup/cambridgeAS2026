function updateCountdowns() {
    const rows = document.querySelectorAll('tr[data-date]');
    
    rows.forEach(row => {
        const examDateStr = row.getAttribute('data-date');
        
        const targetTimePKT = new Date(examDateStr + "+05:00"); 
        
        const now = new Date();
        const distance = targetTimePKT - now;
        const timerSpan = row.querySelector('.timer');

        if (distance < 0) {
            timerSpan.innerHTML = "DONE";
            timerSpan.style.color = "#aaa";
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        timerSpan.innerHTML = `${d}d ${h}h ${m}m`;
    });
}setInterval(updateCountdowns, 60000);
updateCountdowns();

let currentFilter = 'all';
let isSorted = false;
let sortType = 'date';

function sortTableAlphabetically() {
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr[data-date]'));

    rows.sort((a, b) => {
        const subjectA = a.querySelector('.tag').textContent.toLowerCase();
        const subjectB = b.querySelector('.tag').textContent.toLowerCase();
        return subjectA.localeCompare(subjectB);
    });

    rows.forEach(row => tbody.appendChild(row));
    sortType = 'alpha';
}

function sortTableByDate() {
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr[data-date]'));

    rows.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date') + "+05:00");
        const dateB = new Date(b.getAttribute('data-date') + "+05:00");
        return dateA - dateB;
    });

    rows.forEach(row => tbody.appendChild(row));
    sortType = 'date';
}

function filterTable() {
}

document.addEventListener('DOMContentLoaded', () => {
    sortTableAlphabetically();
    isSorted = true;
    document.querySelector('[data-filter="sort-alpha"]').classList.add('active');

    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.getAttribute('data-filter');
            
            if (filterType === 'sort-date') {
                sortTableByDate();
                isSorted = true;
            } else if (filterType === 'sort-alpha') {
                sortTableAlphabetically();
                isSorted = true;
            } else {
                currentFilter = filterType;
            }
            
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

const syllabuses = {
    chem1: `
        <h3>Physical Chemistry</h3>
        <ul>
            <li>1 Atomic structure</li>
            <li>2 Atoms, molecules and stoichiometry</li>
            <li>3 Chemical bonding</li>
            <li>4 States of matter</li>
            <li>5 Chemical energetics</li>
            <li>6 Electrochemistry</li>
            <li>7 Equilibria</li>
            <li>8 Reaction kinetics</li>
        </ul>
        <h3>Inorganic Chemistry</h3>
        <ul>
            <li>9 The Periodic Table: chemical periodicity</li>
            <li>10 Group 2</li>
            <li>11 Group 17</li>
            <li>12 Nitrogen and sulfur</li>
        </ul>
        <h3>Organic Chemistry</h3>
        <ul>
            <li>13 Introduction to AS organic chemistry</li>
            <li>14 Hydrocarbons</li>
            <li>15 Halogen compounds</li>
            <li>16 Hydroxy compounds</li>
            <li>17 Carbonyl compounds</li>
            <li>18 Carboxylic acids and derivatives</li>
            <li>19 Nitrogen compounds</li>
            <li>20 Polymerisation</li>
            <li>21 Organic synthesis</li>
        </ul>
        <h3>Analysis</h3>
        <ul>
            <li>22 Analytical techniques</li>
        </ul>
    `,

    chem2: `
        <p><em>Same theory content as Paper 12.</em></p>
        <h3>Physical Chemistry</h3>
        <ul>
            <li>1 Atomic structure</li>
            <li>2 Atoms, molecules and stoichiometry</li>
            <li>3 Chemical bonding</li>
            <li>4 States of matter</li>
            <li>5 Chemical energetics</li>
            <li>6 Electrochemistry</li>
            <li>7 Equilibria</li>
            <li>8 Reaction kinetics</li>
        </ul>
        <h3>Inorganic Chemistry</h3>
        <ul>
            <li>9 The Periodic Table: chemical periodicity</li>
            <li>10 Group 2</li>
            <li>11 Group 17</li>
            <li>12 Nitrogen and sulfur</li>
        </ul>
        <h3>Organic Chemistry</h3>
        <ul>
            <li>13 Introduction to AS organic chemistry</li>
            <li>14 Hydrocarbons</li>
            <li>15 Halogen compounds</li>
            <li>16 Hydroxy compounds</li>
            <li>17 Carbonyl compounds</li>
            <li>18 Carboxylic acids and derivatives</li>
            <li>19 Nitrogen compounds</li>
            <li>20 Polymerisation</li>
            <li>21 Organic synthesis</li>
        </ul>
        <h3>Analysis</h3>
        <ul>
            <li>22 Analytical techniques</li>
        </ul>
    `,

    chem3: `
        <h3>Practical Syllabus (Paper 33)</h3>
        <ul>
            <li><b>Manipulation, measurement and observation:</b> Accurate use of pipettes, burettes, and thermometers.</li>
            <li><b>Presentation of data and observations:</b> Conform to scientific conventions for tables and graphs.</li>
            <li><b>Analysis, conclusions and evaluation:</b> Scientific explanations of data and identifying sources of error.</li>
            <li><b>Procedures:</b> Titrations, rates of reaction, gravimetric, thermometric, and qualitative analysis of ions/gases.</li>
        </ul>
    `,

    phys1: `
        <h3>Syllabus Topic Headings</h3>
        <ul>
            <li><b>1 Physical quantities and units:</b> 1.1 Physical quantities; 1.2 SI units; 1.3 Errors and uncertainties; 1.4 Scalars and vectors.</li>
            <li><b>2 Kinematics:</b> 2.1 Equations of motion.</li>
            <li><b>3 Dynamics:</b> 3.1 Momentum and Newton’s laws; 3.2 Non-uniform motion; 3.3 Linear momentum and conservation.</li>
            <li><b>4 Forces, density and pressure:</b> 4.1 Turning effects; 4.2 Equilibrium; 4.3 Density and pressure.</li>
            <li><b>5 Work, energy and power:</b> 5.1 Energy conservation; 5.2 Potential and kinetic energy.</li>
            <li><b>6 Deformation of solids:</b> 6.1 Stress and strain; 6.2 Elastic and plastic behaviour.</li>
            <li><b>7 Waves:</b> 7.1 Progressive waves; 7.2 Transverse and longitudinal; 7.3 Doppler effect; 7.4 Electromagnetic spectrum; 7.5 Polarisation.</li>
            <li><b>8 Superposition:</b> 8.1 Stationary waves; 8.2 Diffraction; 8.3 Interference; 8.4 Diffraction grating.</li>
            <li><b>9 Electricity:</b> 9.1 Electric current; 9.2 Potential difference and power; 9.3 Resistance and resistivity.</li>
            <li><b>10 D.C. circuits:</b> 10.1 Practical circuits; 10.2 Kirchhoff’s laws; 10.3 Potential dividers.</li>
            <li><b>11 Particle physics:</b> 11.1 Atoms, nuclei and radiation; 11.2 Fundamental particles.</li>
        </ul>
    `,

    phys2: `
        <p><em>Same theory content as Paper 12.</em></p>
        <h3>Syllabus Topic Headings</h3>
        <ul>
            <li><b>1 Physical quantities and units:</b> 1.1 Physical quantities; 1.2 SI units; 1.3 Errors and uncertainties; 1.4 Scalars and vectors.</li>
            <li><b>2 Kinematics:</b> 2.1 Equations of motion.</li>
            <li><b>3 Dynamics:</b> 3.1 Momentum and Newton’s laws; 3.2 Non-uniform motion; 3.3 Linear momentum and conservation.</li>
            <li><b>4 Forces, density and pressure:</b> 4.1 Turning effects; 4.2 Equilibrium; 4.3 Density and pressure.</li>
            <li><b>5 Work, energy and power:</b> 5.1 Energy conservation; 5.2 Potential and kinetic energy.</li>
            <li><b>6 Deformation of solids:</b> 6.1 Stress and strain; 6.2 Elastic and plastic behaviour.</li>
            <li><b>7 Waves:</b> 7.1 Progressive waves; 7.2 Transverse and longitudinal; 7.3 Doppler effect; 7.4 Electromagnetic spectrum; 7.5 Polarisation.</li>
            <li><b>8 Superposition:</b> 8.1 Stationary waves; 8.2 Diffraction; 8.3 Interference; 8.4 Diffraction grating.</li>
            <li><b>9 Electricity:</b> 9.1 Electric current; 9.2 Potential difference and power; 9.3 Resistance and resistivity.</li>
            <li><b>10 D.C. circuits:</b> 10.1 Practical circuits; 10.2 Kirchhoff’s laws; 10.3 Potential dividers.</li>
            <li><b>11 Particle physics:</b> 11.1 Atoms, nuclei and radiation; 11.2 Fundamental particles.</li>
        </ul>
    `,

    phys3: `
        <h3>Practical Syllabus (Paper 33)</h3>
        <ul>
            <li><b>Manipulation, measurement and observation:</b> Setting up apparatus and data collection.</li>
            <li><b>Presentation of data and observations:</b> Tables of results and graphical plotting.</li>
            <li><b>Analysis, conclusions and evaluation:</b> Interpretation of graphs, estimating uncertainties, and identifying limitations.</li>
        </ul>
    `,

    math1: `
        <h3>Paper 1: Pure Mathematics 1</h3>
        <ul>
            <li>1.1 Quadratics.</li>
            <li>1.2 Functions.</li>
            <li>1.3 Coordinate geometry.</li>
            <li>1.4 Circular measure.</li>
            <li>1.5 Trigonometry.</li>
            <li>1.6 Series.</li>
            <li>1.7 Differentiation.</li>
            <li>1.8 Integration.</li>
        </ul>
    `,

    math4: `
        <h3>Paper 4: Mechanics</h3>
        <ul>
            <li>4.1 Forces and equilibrium.</li>
            <li>4.2 Kinematics of motion in a straight line.</li>
            <li>4.3 Momentum.</li>
            <li>4.4 Newton’s laws of motion.</li>
            <li>4.5 Energy, work and power.</li>
        </ul>
    `,

    stat1: `
        <h3>Paper 5: Probability & Statistics 1</h3>
        <ul>
            <li>5.1 Representation of data.</li>
            <li>5.2 Permutations and combinations.</li>
            <li>5.3 Probability.</li>
            <li>5.4 Discrete random variables.</li>
            <li>5.5 The normal distribution.</li>
        </ul>
    `,

    cs1: `
        <h3>Paper 12: Theory Fundamentals</h3>
        <ul>
            <li>1 Information representation.</li>
            <li>2 Communication.</li>
            <li>3 Hardware.</li>
            <li>4 Processor Fundamentals.</li>
            <li>5 System Software.</li>
            <li>6 Security, privacy and data integrity.</li>
            <li>7 Ethics and Ownership.</li>
            <li>8 Databases.</li>
        </ul>
    `,

    cs2: `
        <h3>Paper 22: Problem-solving & Programming</h3>
        <ul>
            <li>9 Algorithm Design and Problem-solving.</li>
            <li>10 Data Types and Structures.</li>
            <li>11 Programming.</li>
            <li>12 Software Development.</li>
        </ul>
    `,
    busi1: `
        <h3>1 Business and its environment</h3>
        <ul>
            <li>1.1 Enterprise</li>
            <li>1.2 Business structure</li>
            <li>1.3 Size of business</li>
            <li>1.4 Business objectives</li>
            <li>1.5 Stakeholders in a business</li>
        </ul>
        <h3>2 Human resource management</h3>
        <ul>
            <li>2.1 HRM</li>
            <li>2.2 Motivation</li>
            <li>2.3 Management</li>
        </ul>
        <h3>3 Marketing</h3>
        <ul>
            <li>3.1 The nature of marketing</li>
            <li>3.2 Market research</li>
            <li>3.3 The marketing mix</li>
        </ul>
        <h3>4 Operations management</h3>
        <ul>
            <li>4.1 The nature of operations</li>
            <li>4.2 Inventory management</li>
            <li>4.3 Capacity utilisation and outsourcing</li>
        </ul>
        <h3>5 Finance and accounting</h3>
        <ul>
            <li>5.1 Business finance</li>
            <li>5.2 Sources of finance</li>
            <li>5.3 Forecasting and managing cash flows</li>
            <li>5.4 Costs</li>
            <li>5.5 Budgets</li>
        </ul>
    `,
    busi2: `
        <p><em>Same theory content as Paper 12.</em></p>
        <h3>1 Business and its environment</h3>
        <ul>
            <li>1.1 Enterprise</li>
            <li>1.2 Business structure</li>
            <li>1.3 Size of business</li>
            <li>1.4 Business objectives</li>
            <li>1.5 Stakeholders in a business</li>
        </ul>
        <h3>2 Human resource management</h3>
        <ul>
            <li>2.1 HRM</li>
            <li>2.2 Motivation</li>
            <li>2.3 Management</li>
        </ul>
        <h3>3 Marketing</h3>
        <ul>
            <li>3.1 The nature of marketing</li>
            <li>3.2 Market research</li>
            <li>3.3 The marketing mix</li>
        </ul>
        <h3>4 Operations management</h3>
        <ul>
            <li>4.1 The nature of operations</li>
            <li>4.2 Inventory management</li>
            <li>4.3 Capacity utilisation and outsourcing</li>
        </ul>
        <h3>5 Finance and accounting</h3>
        <ul>
            <li>5.1 Business finance</li>
            <li>5.2 Sources of finance</li>
            <li>5.3 Forecasting and managing cash flows</li>
            <li>5.4 Costs</li>
            <li>5.5 Budgets</li>
        </ul>
    `,
    acc1: `
        <h3>1 Financial Accounting</h3>
        <ul>
            <li>1.1 Types of business entity</li>
            <li>1.2 The accounting system</li>
            <li>1.3 Accounting for non-current assets</li>
            <li>1.4 Reconciliation and verification</li>
            <li>1.5 Preparation of financial statements</li>
            <li>1.6 Analysis and communication of accounting information</li>
        </ul>
        <h3>2 Cost and Management Accounting</h3>
        <ul>
            <li>2.1 Costs and cost behaviour</li>
            <li>2.2 Traditional costing methods</li>
        </ul>
    `,
    acc2: `
        <p><em>Same theory content as Paper 12.</em></p>
        <h3>1 Financial Accounting</h3>
        <ul>
            <li>1.1 Types of business entity</li>
            <li>1.2 The accounting system</li>
            <li>1.3 Accounting for non-current assets</li>
            <li>1.4 Reconciliation and verification</li>
            <li>1.5 Preparation of financial statements</li>
            <li>1.6 Analysis and communication of accounting information</li>
        </ul>
        <h3>2 Cost and Management Accounting</h3>
        <ul>
            <li>2.1 Costs and cost behaviour</li>
            <li>2.2 Traditional costing methods</li>
        </ul>
    `,
    econ1: `
        <h3>1 Basic economic ideas and resource allocation</h3>
        <ul>
            <li>Scarcity, choice, and opportunity cost</li>
            <li>Economic methodology</li>
            <li>Factors of production</li>
            <li>Price classification of goods</li>
        </ul>
        <h3>2 The price system and the microeconomy</h3>
        <ul>
            <li>Demand and supply curves</li>
            <li>Price, income, and cross elasticities</li>
            <li>Interaction of market forces</li>
            <li>Consumer and producer surplus</li>
        </ul>
        <h3>3 Government microeconomic intervention</h3>
        <ul>
            <li>Reasons for and methods of intervention</li>
            <li>Addressing income and wealth inequality</li>
        </ul>
        <h3>4 The macroeconomy</h3>
        <ul>
            <li>National income statistics</li>
            <li>Circular flow of income</li>
            <li>Aggregate Demand (AD) and Aggregate Supply (AS) analysis</li>
            <li>Economic growth, unemployment, and price stability</li>
        </ul>
        <h3>5 Government macroeconomic intervention</h3>
        <ul>
            <li>Fiscal, monetary, and supply-side policies</li>
        </ul>
        <h3>6 International economic issues</h3>
        <ul>
            <li>Reasons for trade</li>
            <li>Protectionism</li>
            <li>Balance of payments current account</li>
            <li>Exchange rates</li>
        </ul>
    `,
    econ2: `
        <p><em>Same theory content as Paper 12.</em></p>
        <h3>1 Basic economic ideas and resource allocation</h3>
        <ul>
            <li>Scarcity, choice, and opportunity cost</li>
            <li>Economic methodology</li>
            <li>Factors of production</li>
            <li>Price classification of goods</li>
        </ul>
        <h3>2 The price system and the microeconomy</h3>
        <ul>
            <li>Demand and supply curves</li>
            <li>Price, income, and cross elasticities</li>
            <li>Interaction of market forces</li>
            <li>Consumer and producer surplus</li>
        </ul>
        <h3>3 Government microeconomic intervention</h3>
        <ul>
            <li>Reasons for and methods of intervention</li>
            <li>Addressing income and wealth inequality</li>
        </ul>
        <h3>4 The macroeconomy</h3>
        <ul>
            <li>National income statistics</li>
            <li>Circular flow of income</li>
            <li>Aggregate Demand (AD) and Aggregate Supply (AS) analysis</li>
            <li>Economic growth, unemployment, and price stability</li>
        </ul>
        <h3>5 Government macroeconomic intervention</h3>
        <ul>
            <li>Fiscal, monetary, and supply-side policies</li>
        </ul>
        <h3>6 International economic issues</h3>
        <ul>
            <li>Reasons for trade</li>
            <li>Protectionism</li>
            <li>Balance of payments current account</li>
            <li>Exchange rates</li>
        </ul>
    `
};

function openSyllabus(code) {
    const modal = document.getElementById('syllModal');
    const body = document.getElementById('modalBody');
    if (!syllabuses[code]) {
        body.innerHTML = '<p style="color: red;">Error: Syllabus not found for this paper.</p>';
    } else {
        body.innerHTML = syllabuses[code];
    }
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    const modal = document.getElementById('syllModal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

window.onclick = function(event) {
    if (event.target == document.getElementById('syllModal')) closeModal();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.syll-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            openSyllabus(code);
        });
    });
});