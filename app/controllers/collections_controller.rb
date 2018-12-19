class CollectionsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def index
    @collections = Collection.all
  end

  def show
    @collection = Collection.find_by(id: params[:id])
    @word = Word.find_by(id: params[:id])
  end

  def new
    @collection = Collection.new
  end

  def create
    collection = current_user.collections.create(collection_params)
    redirect_to collections_path 
  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy

    redirect_to collections_path 
  end

  private

  def collection_params
    params.require(:collection).permit(:name, :image)
  end
end
