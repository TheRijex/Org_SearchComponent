public with sharing class MultiSelectController {

    @AuraEnabled(cacheable = true)
    public static List<sObject> getValues(String searchKeyWords, String objectsAndFieldForSearch) {
        Map<String, Set<String>> mapName = (Map<String, Set<String>>) JSON.deserialize(objectsAndFieldForSearch, Map<String, Set<String>>.class);
        List<sObject> preparedData = new List<sObject>();
        String searchTerm = searchKeyWords;
        String returnValues;
        List<String> returnings = new List<String>();
        for (String fieldName : mapName.keySet()){
            String item1 = fieldName + '(';
            String mySet_Joined = String.join((Iterable<String>)mapName.get(fieldName), ', ');
            item1 = item1 + mySet_Joined + ')';
            returnings.add(item1);    
        }
        returnValues = String.join(returnings, ', ');
        List<List<sObject>> results = search.query('find :searchTerm in all fields returning ' + returnValues);
        for (Integer i = 0; i < results.size(); i++) {
                preparedData.addAll(results[i]);
        }
        
        for (sObject record : preparedData) {
            Schema.SObjectType sObjectType = record.getSObjectType();   //get record type name, Case or Event
            System.debug(sObjectType);
        }
        System.debug(preparedData);
        return preparedData;
    }
}