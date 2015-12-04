# JsonGraph Parse
JsonGraph Parse is a library for using path sets to extract values from a JSON Graph object.


## Example

'''js

var graph = {
    "user_preferencesById": {
        "1": {
            "user": {
                "value": ["usersById", "1"],
                "$type": "ref"
            },
            "key": "favorite_color",
            "user_id": 1,
            "value": "Black",
            "id": 1
        }
    },
    "usersById": {
        "1": {
            "id": 1,
            "firstname": "Jane",
            "lastname": "Smith",
            "preferences": [{
                "value": ["user_preferencesById", "1"],
                "$type": "ref"
            }]
        }
    },
    "user": {
        "value": ["usersById", "1"],
        "$type": "ref"
    }
};


var color = JsonGraph.parse(graph, ['user', 'preferences', 0, 'value']); // Black

'''
