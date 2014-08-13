class GamesController < ApplicationController

  # to go to home page with levels and sizes
  def home
    @levels = [1,2,3,4,5]
    @sizes = ['5x5' , '10x10']
  end

  # to see the blocks of '5x5' or '10x10'
  def get_view
    @level = params[:game][:level]
    @size = 5
    if params[:game][:size] == '10x10'
      @size = 10
    end
  end

  # to select which blocks need to highlights
  def select_blocks
    @size = params[:size]
    @level = params[:level]
    no_of_blocks
  end

  # to get number of blocks to highlight
  def no_of_blocks
    @highlighted_blocks = ""
    blocks = Random.rand(5) + 1
    blocks.times {|count|
      row = Random.rand(5)
      column = Random.rand(5)
      @highlighted_blocks << "#button_#{row}_#{column} "
    }
  end
end
