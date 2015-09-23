/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
String.prototype.indexOfRegex = function( pattern, startIndex )
{
    startIndex = startIndex || 0;
    var searchResult = this.substr( startIndex ).search( pattern );
    return ( -1 === searchResult ) ? -1 : searchResult + startIndex;
}

String.prototype.lastIndexOfRegex = function( pattern, startIndex )
{
    startIndex = startIndex === undefined ? this.length : startIndex;
    var searchResult = this.substr( 0, startIndex ).reverse().regexIndexOf( pattern, 0 );
    return ( -1 === searchResult ) ? -1 : this.length - ++searchResult;
}

String.prototype.reverse = function()
{
    return this.split('').reverse().join('');
}  

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //alert('asd'); 
        
    //    console.log([1,2,3,4,5]);
       // console.log({a:1,b:2,c:3});
         function onSuccess(contacts) {
            
            // console.log(contacts);

             $$.each(contacts, function (index, value) {
                
                //   for (a in value ){
                  //     if ( typeof value[a] != 'function'){
                           
                         //    console.log( a + ' ' + value.name );  
                 
                 if ( value.name.formatted == ''    ) {
                     
                        var name = [];       
                        $$.each(value.name , function( k , e){
                            if (e){
                                
                            name.push( k + ': ' + e  + '<br />');
                            }
                        })
                        name = name.join(' ');
                    } else{ 
                        name = value.name.formatted ; 

                    }
                 
                    var phones = [];       
                    if (value.phoneNumbers) {
                         for (var j=0; j< value.phoneNumbers.length ; j++) {
                            e=value.phoneNumbers[j];
                            if ( e && e.value.indexOf('+') == -1  &&( 
                                    e.value.indexOf('15') == 0 
                                ||  e.value.indexOfRegex(/011( |-)*15/g) == 0 
                                ||  e.value.indexOf('11') == 0
                            
                            ) ){
                                
                                e.value = e.value.replace(/[^0-9]/g,'').replace(/^(011)*( |-)*(11|15)/,'+54911');
                                
                                var myContact = navigator.contacts.create(e);//e.save();
                                try {
                                    myContact.save() ;  
                                } catch(e){}
                                phones.push(  e.type + ':' + e.value );
                            }
                        };
                    } 
                 
                    if ( phones.length >= 1   ){
                        
                     //   console.log("\r\n\t"+ phones.join("\r\n") );
                 
                //   break ;
                        
                        phones = '<br />' + phones.join("<br />");
                            text = name + phones;
                         //   console.log(name + phones );
                            li = '<li><div class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">' +text + '</div></div><div class="item-after">Another label</div></div></li>' ;  
                           
                                
                    /*                    
                            <li>
                                <div class="item-content">
                                    <div class="item-media">
                                        <img src="path/to/img.jpg">
                                    </div>
                                    <div class="item-inner">
                                        <div class="item-title-row">
                                            <div class="item-title">Element title</div>
                                            <div class="item-after">Element label</div>
                                        </div>
                                         <div class="item-subtitle">Subtitle</div>
                                        <div class="item-text">Additional description text</div>
                                    </div>
                                </div>
                            </li>   
                        */
                        
                            $$('#contacts').append(li);
                    }
                           
                    //   }
                       
                //   }
                 
                 
               // console.log (index + ': ' + value.displayName ); 
               //  break ; 
            });     
        //    alert('Found ' + contacts.length + ' contacts.');
        };

        function onError(contactError) {
          //  alert('onError!'); 
        };

        // find all contacts with 'Bob' in any name field
        var options      = new ContactFindOptions();
      //  options.filter   = "cristian"; //regina
        options.multiple = true;
    //    options.desiredFields = [  ]; //navigator.contacts.fieldType.id
        options.hasPhoneNumber = false;
        var fields       = ["id" ,"displayName" , "nickname", "name", "phoneNumbers"]  ;// ;[navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, onSuccess, onError, options);
            
        
    },
    // Update DOM on a Received Event     
    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
    }
};
