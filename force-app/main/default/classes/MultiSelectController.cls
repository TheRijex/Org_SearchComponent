public with sharing class MultiSelectController {


    public static void getValues(String searckKeyWords, Map<String, Set<String>> objectsAndFieldForSearch) {
        String searchTerm = searckKeyWords;
        String returnValues;
        List<String> returnings = new List<String>();
        for (String fieldName : objectsAndFieldForSearch.keySet()){
            String item1 = fieldName + '(';
            String mySet_Joined = String.join((Iterable<String>)objectsAndFieldForSearch.get(fieldName), ', ');
            item1 = item1 + mySet_Joined + ')';
            returnings.add(item1);    
        }
        returnValues = String.join(returnings, ', ');
        List<List<sObject>> results = search.query('find :searchTerm in all fields returning ' + returnValues);
        for (Integer i = 0; i < results.size(); i++) {
            if(results[i].size() != 0) {
                System.debug('Loop'+ i);
                System.debug(results[i]);
            }
            
        }
        // return results;
    }
}