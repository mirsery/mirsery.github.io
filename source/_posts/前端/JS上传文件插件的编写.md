---
date: 2018-09-21 10:22:52
status: public
title: js上传文件插件
tags: 
  - 前端
  - 插件
categories:
  - 前端
---

最近由于项目的需要自己写了一个简易的单文件上传插件，并整合了volidate插件可以对数据进行过滤。
首先贴出html的源码部分(基于bootstrap3 ui):
##页面html代码
```html:n
<div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">文档上传 Demo</h3>
          </div>
            <div class="box-body">
          <form id="form" enctype="multipart/form-data" method="post">
              <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                <input type="text" class="form-control" name="example" placeholder="请输入文字" style="background-color: transparent;">
              </div>
              <label>文件1上传</label>
              <div class="form-group">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="上传文档1" name="file1-volidate" style="background-color: transparent;" readOnly="readOnly">
                <input type="file" name="file1" class="hide file-upload">
                <span class="input-group-btn">
                  <button type="button" class="btn btn-primary file-upload-button">文件1上传</button>
                </span>
              </div>
            </div>
              <label>文件2上传</label>
              <div class="form-group">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="上传文档2" name="file2-volidate" style="background-color: transparent;" readOnly="readOnly">
                <input type="file" name="file2" class="hide file-upload">
                <span class="input-group-btn">
                  <button type="button" class="btn btn-primary file-upload-button">文件1上传</button>
                </span>
              </div>
            </div>
            <div class="box-footer">
              <button type="submit" class="btn btn-primary">提交</button>
            </div>
            </div>
            </div>
          </form>
      </div>
    </div>
```
##js源码
接下来是js源码部分:
```javaScript:n
 filesUpload.init($("#form"));//传入需要验证的dom,在此之前引入filesUpload.js文件
  $('#form').formValidation({
      framework: 'bootstrap',
      message: '信息不能为空',
      icon: {
          // valid: 'glyphicon glyphicon-ok',
          // invalid: 'glyphicon glyphicon-remove',
          // validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
          example: {
              validators: {
                  notEmpty: {
                      message: '文字不能为空'
                  }
              }
          },
          'file1-volidate': {
              validators: {
                callback: {
                  message: '文件不能为空',
                  callback: function (value, validator, $field) {
                     return value != "";
                  }
                }
              }
          },
          "file2-volidate": {
            validators: {
              callback: {
                message: '文件不能为空',
                callback: function (value, validator, $field) {
                  return value != "";
                }
              }
            }
          },
      }
  });
//ajaxForm是jQueryFormAjax插件的方法需要引入[jquery.form.min.js](https://cdn.jsdelivr.net/jquery.form/4.0.1/jquery.form.min.js)
  $('#form').ajaxForm({
    url:'upload',
    dataType:'json',
    success:function (data) {
      console.log(data);
    }
  });
```
filesUpload.js文件源码
##插件代码部分
```javaScript:n
var filesUpload = {
  init:function(volidate){
    if(volidate==""){
      $.each($('.file-upload'), function(index, value) {
          filesUpload.loadBind(value);
      });
    }else{
      $.each($('.file-upload'), function(index, value) {
          filesUpload.loadBind(value,volidate);
      });
    }
  },
  loadBind:function (obj,volidate) {
    let text = $($(obj).parent().children('input[type="text"]')[0]);

    text.click(function(){
        $(obj).trigger('click');
    });

    //绑定上传按钮
    let button = $($(obj).parent().children().find('.file-upload-button')[0]);
    button.click(function(){
      $(obj).trigger('click');
    });
    if(volidate==""){
      $(obj).on('change',function(){
          //绑定上传样式
          let pos =$(this).val().lastIndexOf("\\");
          let fileName = $(this).val().substring(pos+1);
          text.val(fileName);
          text.trigger('click');
      });
    }else{
      $(obj).on('change',function(){
          //绑定上传样式
          let pos =$(this).val().lastIndexOf("\\");
          let fileName = $(this).val().substring(pos+1);
          text.val(fileName);
          text.trigger('click');
          $(volidate).data('formValidation').resetForm();
          $(volidate).formValidation('validate');
      });
    }
  }
};
```