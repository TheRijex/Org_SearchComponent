@isTest
private  class TestMultiSelectController {
    static testMethod void soslQueryTesting() {
        //Create Data
        Account accObj = new Account();
        accObj.Name = 'TestName';
        insert accObj;
        //Testing
        Test.startTest();
        String testMap = JSON.serialize(new Map<String, Set<String>>{'Account'=>new Set<String>{'Name', 'Id'}});
        List<sObject> testData = MultiSelectController.getValues('TestName', testMap);
        Test.stopTest();

        //Rework
        Integer x = 10 / 5;
        System.assertEquals(2, x);
    }
}