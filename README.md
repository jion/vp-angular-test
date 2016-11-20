# Dependencies
* Node http-server:
```bash
node install -g http-server
```

# Instructions to run

1. Clone the repo
2. Run node http-server:
```bash
http-server
```
3. Load the url provided by the server

# First approach: jQuery fetch & Load
In this first attemp, I just did the minimal effort in order to get things
working. My aim here was to get a table (the basis for the future grid) with
all data inside it, in the form in which it was requested in the statement.

In order to do that, I used jquery library in order to fetch both JSONs, and
a function that given an id returns the outlet name string.
So, after fetch all the data, I render it in one pass using a for loop and
some jQuery.

Code:

```javascript
    $( document ).ready(function () {
        $.get('data/contacts.json', function (contacts) {
            $.get('data/outlets.json', function (outlets) {
                var getOutletName = function(outlet_id) {
                    return $.grep(outlets, function (e) {
                        return e.id == outlet_id;
                    }) [0].name;
                };
                var $outletTable = $("#outlet-rows");
                $.each(contacts, function (idx, item){
                    var $newRow = $( '<tr id="row-' + idx + '"></tr>' );
                    $newRow
                        .append([
                            $("<td></td>").text(item.firstName + " " + item.lastName),
                            $("<td></td>").text(item.title),
                            $("<td></td>").text(getOutletName(item.outletId)),
                            $("<td></td>").text(item.profile)
                        ]);
                    $outletTable.append($newRow);
                });
            });
        });
    });
 ```

 Just to note that there is some inefficiency, like do a grep search for any
 element in order to get the outlet name, some code repetition (creation of td's),
 and some assumptions (There is all the needed data, data is never empty)
 but take in account that this is a rapid prototype in order to get a basic
 prototype were we can start to separate concerns and divide things.

 Main problem of this approach: *Not scalable*. Is huge just with 100 records, how about when we have 1M?

 Also, this approach didn't cover:

 * Sortable grid
 * Pagination

# Second approach: Using Angular.js

In this second approach, after reading in order to refresh my memory, I converted my prototype
in an Angular 1.x application. This is basically the same, so the same problem that before there
is here.


