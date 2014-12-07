var app = app || {};

(function ($) {
	'use strict';

	app.ArticleView = Backbone.View.extend({
		events: {
			"click #article-show-button" : "articleShow"
		},
		el:'#knowledge',
		articleTemplate: _.template($('#articleTemplate').html()),
		
		render: function(items){
			var str, i, j = 0;
			for(i = 0; i < items.length; i++){
				if(j === 0){
					str = '<div class="row-fluid">';
				}
				str = str + this.articleTemplate(items[i]);
				j++;
				if(j === 3 || _.isUndefined(items[i+1])){
					str = str + '</div>';
					this.$el.append(str);
					j = 0;	
				}
			};
			return this;	
		},
		articleShow: function(e){
			this.trigger('showDetail',$(e.target).attr("value"));
		}
	});

	app.ArticleAddView = Backbone.View.extend({
		initialize: function(){
			this.$title = this.$('#input-title');
			this.$errorCode = this.$('#input-errorCode');
			this.$progress = this.$('#input-progress');
			this.$category = this.$('#input-category');
			this.$content1 = this.$('#input-content1');
			this.$content2 = this.$('#input-content2');

			// this.listenTo(app.Articles, 'add', this.completeMsg);
			app.Articles.model = app.ArticleModel;
		},

		// read template
		inputFormFailureTemplate: _.template($('#inputFormFailureTemplate').html()),
		inputFormQuestionTemplate: _.template($('#inputFormQuestionTemplate').html()),
		inputFormTecTemplate: _.template($('#inputFormTecTemplate').html()),
		inputFormComTemplate: _.template($('#inputFormComTemplate').html()),
		inputFormProjectTemplate: _.template($('#inputFormProjectTemplate').html()),
		inputFormShortTemplate: _.template($('#inputFormShortTemplate').html()),

		
		el: '#inputModal',
		events: {
			'click #article-add-button': 'articleAdd',
			'change #input-category': 'renderInputForm'
		},
		newAttributes: function(){
			var values, i, params, return_data = {};
			values = $('#article-data');
			params = values.serializeArray();
			for(i = 0; i < params.length; i++){
				return_data[params[i].name] = params[i].value;
			}
			return return_data;
		},
		clearAttributes: function(){
			this.$title.val('');
			this.$category.val('');
			this.$content1.val('');
			this.$content2.val('');
		},
		articleAdd: function(e){
			app.Articles.create(this.newAttributes(),{
				wait:true,
				success:function(resp){
					// 正常に登録された旨のコメント
					alert("正常に登録することができました");
					// クリア
					$('#input-form').children().remove();
					$('#input-category').val('default');
				},
				error:function(resp){
					// 異常が発生した旨のコメント
				}
			});	
		},
		completeMsg: function(e){
			alert("登録が完了しました");
		},
		renderInputForm: function(e){
			var str;

			if(this.$category.val() === 'default'){
				this.$('#input-form').children().remove();
				return this;
			}
			this.$('#input-form').children().remove();
			if(this.$category.val() === '障害情報'){
				str = this.inputFormFailureTemplate({});
			}
			if(this.$category.val() === '問い合わせ情報'){
				str = this.inputFormQuestionTemplate({});
			}
			if(this.$category.val() === '技術情報'){
				str = this.inputFormTecTemplate({});
			}
			if(this.$category.val() === '共有情報'){
				str = this.inputFormComTemplate({});
			}
			if(this.$category.val() === 'ショート情報'){
				str = this.inputFormShortTemplate({});
			}
			if(this.$category.val() === 'プロジェクト情報'){
				str = this.inputFormProjectTemplate({});
			}
			this.$('#input-form').append(str);
			return this;
		}

	});

	app.ArticleDetailView = Backbone.View.extend({
		initialize: function(){
			var mainView = new app.ArticleView();
			this.listenTo(mainView, 'showDetail', this.articleShow);
		},

		// read template
		showDetailFailureTemplate: _.template($('#showDetailFailureTemplate').html()),
		showDetailQuestionTemplate: _.template($('#showDetailQuestionTemplate').html()),
		showDetailTecTemplate: _.template($('#showDetailTecTemplate').html()),
		showDetailComTemplate: _.template($('#showDetailComTemplate').html()),
		showDetailProjectTemplate: _.template($('#showDetailProjectTemplate').html()),
		showDetailShortTemplate: _.template($('#showDetailShortTemplate').html()),
		
		el: '#detailModal',

		events: {
			'click #article-edit-button': 'articleEdit'
		},
		articleShow: function(id){
			var article = app.Articles.findWhere({"_id":id});
			this.renderShowDetail(article);
		},
		renderShowDetail: function(article){
			var str,
			 //　表示用にディープコピーを実施
			data = $.extend(true,{},article.attributes);

			data.article.content1 = app.util.chgNewLine(data.article.content1);
			data.article.content2 = app.util.chgNewLine(data.article.content2);			

			if(article.attributes.article.category === '障害情報'){
				str = this.showDetailFailureTemplate(data);
			}
			if(article.attributes.article.category === '問い合わせ情報'){
				str = this.showDetailQuestionTemplate(data);
			}
			if(article.attributes.article.category === '技術情報'){
				str = this.showDetailTecTemplate(data);
			}
			if(article.attributes.article.category === '共有情報'){
				str = this.showDetailComTemplate(data);
			}
			if(article.attributes.article.category === 'ショート情報'){
				str = this.showDetailShortTemplate(data);
			}
			if(article.attributes.article.category === 'プロジェクト情報'){
				str = this.showDetailProjectTemplate(data);
			}
			this.$('#show-detail').html(str);
			return this;
		},
		articleEdit: function(e){
			this.trigger('showEdit',$('#article-edit-id').attr("value"));	
		}
	});

	app.ArticleEditView = Backbone.View.extend({

		initialize: function(){

			this.$title = this.$('#edit-title');
			this.$errorCode = this.$('#edit-errorCode');
			this.$progress = this.$('#edit-progress');
			this.$category = this.$('#edit-category');
			this.$content1 = this.$('#edit-content1');
			this.$content2 = this.$('#edit-content2');

			var detailView = new app.ArticleDetailView();
			this.listenTo(detailView, 'showEdit', this.articleEdit);
		},

		el: '#editModal',

		// read template
		editFormFailureTemplate: _.template($('#editFormFailureTemplate').html()),
		editFormQuestionTemplate: _.template($('#editFormQuestionTemplate').html()),
		editFormTecTemplate: _.template($('#editFormTecTemplate').html()),
		editFormComTemplate: _.template($('#editFormComTemplate').html()),
		editFormProjectTemplate: _.template($('#editFormProjectTemplate').html()),
		editFormShortTemplate: _.template($('#editFormShortTemplate').html()),

		articleEdit: function(id){
			var article = app.Articles.findWhere({"_id":id});
			this.renderEditForm(article);
		},
		renderEditForm: function(article){
			var str;

			if(article.attributes.article.category === '障害情報'){
				str = this.editFormFailureTemplate(article.attributes);
				$('#edit-progress').val(article.attributes.progress);
			}
			if(article.attributes.article.category === '問い合わせ情報'){
				str = this.editFormQuestionTemplate(article.attributes);
				$('#edit-progress').val(article.attributes.progress);
			}
			if(article.attributes.article.category === '技術情報'){
				str = this.editFormTecTemplate(article.attributes);
			}
			if(article.attributes.article.category === '共有情報'){
				str = this.editFormComTemplate(article.attributes);
			}
			if(article.attributes.article.category === 'ショート情報'){
				str = this.editFormShortTemplate(article.attributes);
			}
			if(article.attributes.article.category === 'プロジェクト情報'){
				str = this.editFormProjectTemplate(article.attributes);
				$('#edit-progress').val(article.attributes.progress);
			}
			$('#edit-category').val(article.attributes.category);
			this.$('#edit-form').html(str);
			return this;
		}	
	});

	app.Articles.model = app.ArticleModel;
	app.Articles.fetch({
		success: function(collection, res, options){
			var viewArticle1 = new app.ArticleView();
			viewArticle1.render(res);
		},
		error: function error(){
			console.log("fetch error");
		}
	});
})(jQuery);





