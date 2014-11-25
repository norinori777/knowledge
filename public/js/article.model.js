var app = app || {};

(function(){
	'use strict';

	app.ArticleModel = Backbone.Model.extend({
		//値のデフォルト設定
		defaults:{
			category:'',
			title:'',
			content1:'',
			content2:''
		},
		//初期化処理
		initialize:function(){
			console.log('articleが初期化されました');
			this.on('change',function(){
				console.log('articleの値が変更されました');
			});

			this.on('change:title',function(){
				console.log('titleが変更されました')
			});
			this.on('change:content1',function(){
				console.log('content1が変更されました')
			});
			this.on('change:content2',function(){
				console.log('content2変更されました')
			});

			this.on('invalid',function(model,error){
				console.log(error);
			});
		},
		//値の正当性をチェック 
		validate:function(attribute){
			if(attribute.title === ''){
				return "titleには、値をセットしましょう";
			}
			if(attribute.content1 === ''){
				return "content1には、値をセットしましょう"
			}
			if(attribute.content2 === ''){
				return "content2には、値をセットしましょう"				
			}
		}
	});
})();




