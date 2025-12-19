export enum BugType {
    // 1. INCORRECT CALCULATIONS
    CALCULATION = 'CALCULATION',     // 2+2=5
    LOGIC = 'LOGIC',                 // Incorrect operation order
  
    // 2. INTERFACE
    UI_VISUAL = 'UI_VISUAL',         // Wrong color/size
    UI_INTERACTION = 'UI_INTERACTION', // Button doesn't click
    UI_FEEDBACK = 'UI_FEEDBACK',     // Missing animation
  
    // 3. ACCESSIBILITY  
    ACCESSIBILITY = 'ACCESSIBILITY', // Missing alt text, poor contrast
  
    // 4. ERRORS
    ERROR_HANDLING = 'ERROR_HANDLING', // Errors not displayed
    VALIDATION = 'VALIDATION'        // Incorrect validation
}