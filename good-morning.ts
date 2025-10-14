import { chromium, Page } from 'playwright';

async function clickContinue(page: Page, timeout = 3000) {
  console.log(`Waiting for ${timeout / 1000} seconds...`);
  await page.waitForTimeout(timeout);
  console.log('Wait finished.');

  console.log('Clicking continue button...');
  await page.click('[data-test="stories-player-continue"]');
  console.log('Continue button clicked.');
}

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: false,               // Show the browser
    args: ['--no-sandbox'],        // Optional for Linux
  });
  console.log('Browser launched.');

  console.log('Creating new page...');
  const page = await browser.newPage();
  console.log('New page created.');

  console.log('Navigating to Duolingo...');
  await page.goto('https://www.duolingo.com');
  console.log('Navigated to Duolingo!');

  console.log('Clicking \"have-account\" button...');
  await page.click('[data-test="have-account"]');
  console.log('Button clicked.');

  console.log('Filling in login form...');
  await page.fill('[data-test="email-input"]', '');
  await page.fill('[data-test="password-input"]', '');
  console.log('Login form filled.');

  console.log('Clicking \"login\" button...');
  await page.click('[data-test="register-button"]');
  console.log('Login button clicked.');

  console.log('Waiting for 5 seconds...');
  await page.waitForTimeout(10000);
  console.log('Wait finished.');

  console.log('Navigating to stories page...');
  await page.goto('https://duolingo.com/practice-hub/stories');
  console.log('Navigated to stories page.');

  console.log('Clicking "Good Morning" story...');
  await page.locator('text=Good Morning').click();
  console.log('"Good Morning" story clicked.');

  console.log('Clicking "start story" button...');
  await page.locator('[data-test="story-start-button"]:has-text("READ")').click();
  console.log('Start story button clicked.');

  console.log('Waiting for network to be idle...');
  await page.waitForLoadState('networkidle');
  console.log('Network is idle.');

  // title: Buenos dias
  await clickContinue(page);

  // Vikram: Buenos dias priti
  await clickContinue(page);

  // priti: Buenos dias mi amor
  await clickContinue(page);

  //priti: Donde estan mis llaves
  await clickContinue(page);

  // Vikram: Tus llaves
  await clickContinue(page, 2000);

  console.log('Clicking "Yes"...');
  await page.locator('text=Yes').click();
  console.log('"Yes" clicked.');

  await clickContinue(page, 2000);

  // priti: Si, necessito ir al trabajo
  await clickContinue(page);

  const tapTokens = ["Necesito-challenge-tap-token", "las llaves-challenge-tap-token", "de-challenge-tap-token", "mi-challenge-tap-token", "carro-challenge-tap-token"]

  console.log('Clicking tap tokens...');
  for (const token of tapTokens) {
    await page.click(`[data-test="${token}"]`);
    console.log(`Clicked "${token}"`);
  }
  console.log('Tap tokens clicked.');

  await clickContinue(page, 2000);

  // Vikram: ¡Ja, ja! ¡Priti, tus llaves están aquí en la mesa! ¡Ja, ja, ja!
  await clickContinue(page, 8000);

  // priti: Perdón, mi amor, estoy cansada. ¡Trabajo mucho!
  await clickContinue(page, 5000);

  console.log('Clicking "cansada" button...');
  await page.click('[data-test="cansada-challenge-tap-token"]');
  console.log('"cansada" button clicked.');

  await clickContinue(page, 2000);

  // Vikram: Quires cafe
  await clickContinue(page, 2000);

  // priti: Si, por favor
  await clickContinue(page, 2000);

  // Vikram: Aqui, esta mi amor
  await clickContinue(page, 2000);

  // priti: ¿Dónde está el azúcar? Ah, aquí está.
  await clickContinue(page, 5000);

  console.log('Clicking "looking"...');
  await page.locator('text=looking').click();
  console.log('"looking" clicked.');

  await clickContinue(page, 2000);

  // Narrator: Ella bebe su cafe
  await clickContinue(page, 3000);

  // priti: Ay no
  await clickContinue(page, 2000);

  // Vikram: que
  await clickContinue(page, 2000);

  // priti: Eso es sal
  await clickContinue(page, 2000);

  // Vikram: Priti estas muy cansada
  await clickContinue(page, 4000);

  // priti: Sí, necesito más café… ¡con azúcar, no con sal!
  await clickContinue(page, 6000);

  console.log('Clicking "salt"...');
  await page.locator('text=salt').click();
  console.log('"salt" clicked.');

  await clickContinue(page, 2000);

  const match = {
    "coffee-challenge-tap-token": "café-challenge-tap-token",
    "here-challenge-tap-token": "aquí-challenge-tap-token",
    "keys-challenge-tap-token": "llaves-challenge-tap-token",
    "sorry-challenge-tap-token": "perdón-challenge-tap-token",
    "salt-challenge-tap-token": "sal-challenge-tap-token",
    "work-challenge-tap-token": "trabajo-challenge-tap-token",
    "table-challenge-tap-token": "mesa-challenge-tap-token",
    "tired-challenge-tap-token": "cansada-challenge-tap-token",
    "I need-challenge-tap-token": "necesito-challenge-tap-token",
    "sugar-challenge-tap-token": "azúcar-challenge-tap-token",
    "love-challenge-tap-token": "amor-challenge-tap-token",
    "car-challenge-tap-token": "carro-challenge-tap-token",
    "want-challenge-tap-token": "quieres-challenge-tap-token",
    "please-challenge-tap-token": "favor-challenge-tap-token",
    "good morning-challenge-tap-token": "buenos días-challenge-tap-token"
  }

  console.log('Clicking matching tokens...');
  for (const key in match) {
    const value = match[key as keyof typeof match];
    const keySelector = `[data-test="${key}"]`;
    const valueSelector = `[data-test="${value}"]`;

    if (await page.locator(keySelector).count() > 0 && await page.locator(valueSelector).count() > 0) {
      console.log(`Clicking "${key}" and "${value}"`);
      await page.click(keySelector);
      await page.click(valueSelector);
    }
  }
  console.log('Matching tokens clicked.');

  await clickContinue(page, 2000)

    console.log('Finishing story...');
  for (let i = 0; i < 3; i++) {
    await clickContinue(page, 5000);
  }

  console.log('Clicking done button...');
  await page.click('[data-test="stories-player-done"]');
  console.log('done button clicked.');

  console.log('Closing browser...');
  await browser.close();
})();