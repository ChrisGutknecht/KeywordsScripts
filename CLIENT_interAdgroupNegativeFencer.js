/******************************************************/
/***************** CONFIG_BLOCK START *****************/
/******************************************************/



///////////////////////////////////////
// 0. General settings and Keys
///////////////////////////////////////

/* To link directly into campaigns and adgroups from the summary email: *
* Paste the ocid parameter from the current URL above */
var ACCOUNT_OCID = 34836217; 


///////////////////////////////////////
// 1. Campaign Scope 
///////////////////////////////////////

var CAMPAIGN_INCLUDE_STRING_I = "GL";

/* These campaigns will be excluded */
var CAMPAIGN_EXCLUDE_STRING_I = "SHO";
var CAMPAIGN_EXCLUDE_STRING_II = "JP";

var SHO_CAMPAIGN_STRING = "SHO"; // Will be excluded
var DSA_CAMPAIGN_STRING = "DSA"; // Will be excluded > separate DSA script in the working

/* If an overlap is merely due to cloned campaigns, this array will be
used to strip both campaign names and identify the shared common root name, thus skipping the overlap. */
var CLONE_CAMPAIGN_STRINGS = ["_RLSA", "_Mobile","_Tablet"];



///////////////////////////////////////
// 2. Date ranges and metric thresholds
///////////////////////////////////////
var DATE_RANGE = "LAST_14_DAYS";

/* Above this limit, an overlap will be logged. Set a sensible limit based on account volume */
var MIN_CLICKS_SOURCE_KEYWORD = 3;

/* Above this limit, the overlap case will be shown in the Above_MaxClicks Tab. *
* These overlaps are discarded because potentially sculpting to much click volume. *
* Set the limit to a value of approx. 4 times the MIN_CLICKS amount */
var MAX_QUERY_CLICKS_FOR_NEGATIVE_AUTO_FENCING = 20;

/* An overlap is only considered when the reference keyword has at least the impressions */
var MIN_IMP_FOR_REFERENCE_KEYWORD = 5;



///////////////////////////////////////
// 3. ACTION and Notification Settings
///////////////////////////////////////

/* IMPORTANT(!) > If set to 1, the script will ADD (!) negatives */
var SET_NEGATIVES = 0; 

/* Copy from this demo sheet >>  https://docs.google.com/spreadsheets/d/1vcFpDZypWdtsGksTGcbENDGAyDN7VS3-ufW54uLC-y4/edit#gid=0  *
* Add your copied URL below */
var LOG_SHEET_URL = "https://docs.google.com/spreadsheets/d/1im8kMvyKHNXyE6o_7aS3ISQ47PgOWmeE59X1rj--7i4/edit#gid=710291004";

/* Add multiple recipients if needed like this: ["email1@company.com", "email2@company.com"]*/
var NOTIFY = ["cgutknecht@noriskshop.de"]; 


var TRIGGER_CONFIG = {
  /* An empty array means the script executes every day. Example values ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] *
  * If the script runs into timeouts, it labels these adgroups with a week label and skips these in the next run within the same week */
  triggerWeekdays : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  
  /* An empty array means script executes every hour. Example values [1,4,6,8,10,15,20] */
  triggerHours: [10] 
};


/******************************************************/
/***************** CONFIG_BLOCK END *******************/
/******************************************************/

var IGNORE_WEEK_LABELS = 1; // Checks all adgroups regardless von weeklabel 
var DEBUG_MODE = 1; // Higher log Level




function main(){
  
  try{
    var test = SpreadsheetApp.openByUrl(LOG_SHEET_URL);
    var scriptfile_name = "https://raw.githubusercontent.com/ChrisGutknecht/KeywordsScripts/master/interAdgroupNegativeFencer.js";
    var scriptFile_raw = UrlFetchApp.fetch(scriptfile_name).getContentText();

    try{
      eval(scriptFile_raw);
      interAdgroupNegativeFencer();
    } catch (e) {try {if(AdWordsApp.getExecutionInfo().isPreview() === false) MailApp.sendEmail(EMAIL_RECIPIENTS[0], "Error in Script: " + SCRIPT_NAME + ":" + AdWordsApp.currentAccount().getName(), "Exception: "+e.message+"\r\nStacktrace:\r\n"+e.stack);} catch (e2) {Logger.log(e2.stack);} throw e;}
  } catch(e3){ Logger.log(e3.stack);throw e3; }
}
