class WordsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def index
    @words = Word.all
  end

  def show
    @word = Word.find_by(id: params[:id])
  end

  def new
    @word = Word.new
  end

  def create
    word = current_user.words.create(word_params)
    redirect_to word_path(word)
  end

  def destroy
    @word = Word.find(params[:id])
    @word.destroy
    redirect_to collections_path
  end

  private

  def word_params
    params.require(:word).permit(:term, :arabic_form, :english_form, :example, :collection_id, :audio, :image)
  end
end
