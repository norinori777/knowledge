var app = app || {};

(function ($) {
	'use strict';

	app.ArticleView = Backbone.View.extend({
		events: {
			"click #article-add": "articleAdd"
		},

		articleTemplate: _.template($('#articleTemplate').html()),
		
		render: function(items){
			var str, j = 0;
			for(var i = 0; i < items.length; i++){
				if(j === 0){
					str = '<div class="row-fluid">';
					//this.$el.append('<div class="row-fluid"hhh>');
				}
				str = str + this.articleTemplate(items[i]);
				//this.$el.append(this.articleTemplate(items.list[i]));
				j++;
				if(j === 3 || _.isUndefined(items[i+1])){
					str = str + '</div>';
					this.$el.append(str);
					//this.$el.append('</div>');
					j = 0;	
				}
			};
			return this;	
		},
		articleAdd: function(){
			console.log("articleAddの実行");
		}
	});

	app.ArticleAddView = Backbone.View.extend({
		initialize: function(){
			this.$input-title = $('#input-title');
			this.$input-category = $('#input-category');
			this.$input-content1 = $('#input-content1');
			this.$input-content2 = $('#input-content2');

			app.Articles.model = app.ArticleModel;
		}
		el: '#inputModal',
		events: {
			'click #article-add-button': 'articleAdd'
		},
		newAttributes: function(){
			return {
				category: this.$input-category.val();
				title: this.$input-title.val();
				content1: this.$input-content1.val();
				content2: this.$input-content2.val();	
			};
		},
		articleAdd: function(e){
			app.Article.create(newAttribute());	
		},

	});

	app.Articles.model = app.ArticleModel;
	app.Articles.fetch({
		success: function(collection, res, options){
			var viewArticle1 = new app.ArticleView({el:'#knowledge'});
			viewArticle1.render(res);
		},
		error: function error(){
			console.log("fetch error");
		}
	});

	
	
})(jQuery);





