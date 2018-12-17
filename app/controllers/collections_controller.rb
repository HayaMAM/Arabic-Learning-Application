class CollectionsController < ApplicationController
  def show
    @collection = Collection.find_by(id: params[:id]); 
  end

  def index
    @collections = Collection.all
  end
  
end
