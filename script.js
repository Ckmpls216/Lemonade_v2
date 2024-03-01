document.addEventListener('DOMContentLoaded', function() {
    let piggyBank = 100; // Starting amount in the piggy bank
    const prices = { lemons: 0.50, cups: 0.25, sugar: 0.30, ice: 0.10 }; // Prices for each item
    let lemonadePrice = 1.00; // Default price per cup
    let recipe = { lemons: 4, sugar: 2, ice: 4 }; // Default recipe
    let currentDay = 1;
    const totalDays = 5;
    const dayDuration = 10000; // Each day lasts 10 seconds
    let salesChance = 0.5; // Base chance of a pedestrian buying lemonade

    document.getElementById('startGame').addEventListener('click', function() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('groceryList').style.display = 'block';
    });

    const inputs = document.querySelectorAll('#groceryForm input');
    inputs.forEach(input => input.addEventListener('input', updateTotalCost));

    document.getElementById('buyItems').addEventListener('click', function() {
        const totalCost = calculateTotalCost();
        
        if (totalCost <= piggyBank) {
            piggyBank -= totalCost;
            document.getElementById('piggyBank').textContent = `$${piggyBank.toFixed(2)}`;
            alert('Items purchased successfully!');
            document.getElementById('groceryList').style.display = 'none';
            document.getElementById('dateAndTimeSelection').style.display = 'block';
            resetInputs();
        } else {
            alert('Not enough money in Piggy Bank!');
        }
    });

    document.getElementById('confirmDateTime').addEventListener('click', function() {
        lemonadePrice = parseFloat(document.getElementById('lemonadePrice').value);
        recipe.lemons = parseInt(document.getElementById('lemonsRecipe').value);
        recipe.sugar = parseInt(document.getElementById('sugarRecipe').value);
        recipe.ice = parseInt(document.getElementById('iceRecipe').value);
        
        alert('Date and Time, Price, and Recipe confirmed. Starting game...');
        document.getElementById('dateAndTimeSelection').style.display = 'none';
        document.getElementById('gameStatus').style.display = 'block';
        startGameOperations();
    });

    function calculateTotalCost() {
        const lemons = parseInt(document.getElementById('lemons').value) || 0;
        const cups = parseInt(document.getElementById('cups').value) || 0;
        const sugar = parseInt(document.getElementById('sugar').value) || 0;
        const ice = parseInt(document.getElementById('ice').value) || 0;

        return (lemons * prices.lemons) + (cups * prices.cups) + (sugar * prices.sugar) + (ice * prices.ice);
    }

    function updateTotalCost() {
        const totalCost = calculateTotalCost();
        document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
    }

    function resetInputs() {
        inputs.forEach(input => input.value = 0);
        updateTotalCost();
    }
    
    function startGameOperations() {
        currentDay = 1; // Reset to Day 1 for game start
        updateDayCounter(currentDay);
        const gameInterval = setInterval(() => {
            simulatePedestrians();
            currentDay++;
            if (currentDay > totalDays) {
                clearInterval(gameInterval);
                endLevel();
            } else {
                updateDayCounter(currentDay);
            }
        }, dayDuration / totalDays); // Adjust for the simulation speed
    }

    function simulatePedestrians() {
        if (Math.random() < salesChance) {
            piggyBank += lemonadePrice;
            document.getElementById('piggyBank').textContent = `$${piggyBank.toFixed(2)}`;
        }
    }

    function updateDayCounter(day) {
        document.getElementById('currentDay').textContent = `Day: ${day}`;
    }

    function endLevel() {
        if (piggyBank > 0) {
            alert('Congratulations! You have completed Level 1.');
        } else {
            alert('Game Over! You have run out of money.');
        }
    }
});
