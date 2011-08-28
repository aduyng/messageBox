/******************************************************************************
 * messageBox
 * @author Duy A. Nguyen aduyng@gmail.com, http://duy-nguyen.info
 * ****************************************************************************/
$.messageBox = {
    Buttons : {
        OK: 1,
        OKCancel: 2,
        AbortRetryIgnore: 3,
        YesNoCancel: 4,
        YesNo: 5,
        RetryCancel: 6
    }, 
    Icon: {
        None:'message-box-dialog-icon-none',
        Question:'message-box-dialog-icon-question',
        Exclamation:'message-box-dialog-icon-exclamation',
        Error:'message-box-dialog-icon-error',
        Information: 'message-box-dialog-icon-information'
    },
    _dlg: null, 
    /**
 * messageBox dialog for showing short message 
 * @param options object configurable parameters when creating the dialog
 * <ul>
 *      <li>text: string (required) - the message will appear on the body of the message box</li>
 *      <li>caption: string (required) - title of the message box</li>
 *      <li>buttons: int (optional, default $.messageBox.Buttons.OK)- define the buttons will appear at the bottom of the dialog.</li>
 *      <li>icon: int (optional, default $.messageBox.Icon)- define the icon will appear next to the text of the dialog.</li>
 *      <li>modal: bool (optional, default true)- make the dialog modal</li>
 *      <li>resizable: bool (optional, default false)- make the dialog resizable</li>
 *      <li>width: int (optional, default 300)- the width of the dialog</li>
 *      <li>yes: function (optional, default null)- callback for Yes button</li>
 *      <li>no: function (optional, default null)- callback for No button</li>
 *      <li>cancel: function (optional, default null)- callback for Cancel button</li>
 *      <li>no: function (optional, default null)- callback for No button</li>
 *      <li>retry: function (optional, default null)- callback for Retry button</li>
 *      <li>abort: function (optional, default null)- callback for Abort button</li>
 *      <li>ignore: function (optional, default null)- callback for Ignore button</li>
 * </ul>
 * @see $.messageBox.Icon 
 * @see $.messageBox.Buttons
 * @example
 * //showing alert message box
 *  $.messageBox.show({
 *      caption: "This is a caption",
 *      text: "This is a text",
 *      ok: function(){
 *          console.log("You click OK");
 *      }
 *  });
 *  //showing alert message box in short form without any callback
 *  $.messageBox.show("This is a text");
 *  
 *  //showing confirm message box
 *  $.messageBox.show({
 *      caption: "Confirm",
 *      text: "Are you sure you want to delete this record",
 *      buttons: $.messageBox.Buttons.YesNo
 *      yes: function(){
 *          console.log("You click Yes");
 *      },
 *      no: function(){
 *          console.log("You click No");
 *      }
 *  });
 *  //showing confirm message box with icon
 *  $.messageBox.show({
 *      caption: "Confirm",
 *      text: "Are you sure you want to delete this record",
 *      buttons: $.messageBox.Buttons.YesNo,
 *      icon: $.messageBox.Icon.Exclamation,
 *      yes: function(){
 *          console.log("You click Yes");
 *      },
 *      no: function(){
 *          console.log("You click No");
 *      }
 *  });
 *  
 * @author Duy A. Nguyen (aduyng at gmail dot com) http://duy-nguyen.info
 */
    
    show: function(options){
        var defaultOptions = {
            text: 'Put your text in here',
            caption: 'Alert',
            buttons: $.messageBox.Buttons.OK,
            icon: $.messageBox.Icon.Information,
            modal: true, 
            resizable: false,
            width: 300
        };

        if( typeof options == "string"){
            options = {
                text: options
            };
        }
        
        options = $.extend(defaultOptions, options);
    
        var dlg = $.messageBox._getDialogObject();

        //set message
        dlg.find('.message-box-dialog-text').html(options.text);
        
        //setting icons
        dlg.find('.message-box-dialog-icon').attr('class', 'message-box-dialog-icon ' + options.icon);

        var buttons = {};
        
        if( options.buttons == $.messageBox.Buttons.OK || options.buttons == $.messageBox.Buttons.OKCancel){
            buttons.OK = function(){
                if( options.ok ){
                    options.ok();
                }
                $.messageBox._cleanUp();
            }
        }
        if( options.buttons == $.messageBox.Buttons.YesNo || options.buttons == $.messageBox.Buttons.YesNoCancel){
            buttons.Yes = function(){
                if( options.yes ){
                    options.yes();
                }
                $.messageBox._cleanUp();
            }
            
            buttons.No = function(){
                if( options.no ){
                    options.no();
                }
                $.messageBox._cleanUp();
            }
        }
        
        if( options.buttons == $.messageBox.Buttons.AbortRetryIgnore || options.buttons == $.messageBox.Buttons.RetryCancel){
            buttons.Retry = function(){
                if( options.retry ){
                    options.retry();
                }
                $.messageBox._cleanUp();
            }
        }
        
        if( options.buttons == $.messageBox.Buttons.OKCancel || options.buttons == $.messageBox.Buttons.YesNoCancel){
            buttons.Cancel = function(){
                if( options.cancel ){
                    options.cancel();
                }
                $.messageBox._cleanUp();
            }
        }
       
        
        if( options.buttons == $.messageBox.Buttons.AbortRetryIgnore){
            buttons.Abort = function(){
                if( options.abort ){
                    options.abort();
                }
                $.messageBox._cleanUp();
            }
            
            buttons.Ignore = function(){
                if( options.ignore ){
                    options.ignore();
                }
                $.messageBox._cleanUp();
            }
        }
        
        
        dlg.dialog({
            title: options.caption,
            modal: options.modal,
            width: options.width,
            resizable: options.resizable,
            buttons: buttons
        });
    },
    _cleanUp: function(){
        var dlg = $.messageBox._getDialogObject();
        dlg.dialog('destroy');
    },
    _getDialogObject: function(){
        var uniqueId = 'dialog-' + (new Date()).getTime();
        if( $.messageBox.dlg == null){
            $.messageBox.dlg = $('<div id="' + uniqueId + '" style="display: none;" class="message-box-dialog"><div class="message-box-dialog-icon"></div><div class="message-box-dialog-text"></div></div>');
            $(document.body).append($.messageBox.dlg);
        }
        return $.messageBox.dlg;
    }
}