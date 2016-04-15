class ConfirmsController < ApplicationController
  before_action :set_confirm, only: [:show, :edit, :update, :destroy]

  # GET /confirms
  def index
    @confirms = Confirm.all
    set_respond
  end

  # GET /confirms/1
  def show
    set_respond
  end

  # GET /confirms/new
  def new
    @confirm = Confirm.new
    set_respond
  end

  # GET /confirms/1/edit
  def edit
    set_respond
  end

  # POST /confirms
  def create
    puts '********************************'
    puts confirm_params
    puts '********************************'
    @confirm = Confirm.new(confirm_params)
    puts @confirm
    if @confirm.save
      set_respond
    else
      render :new
    end
  end

  # PATCH/PUT /confirms/1
  def update
    if @confirm.update(confirm_params)
      set_respond
    else
      render :edit
    end
  end

  # DELETE /confirms/1
  def destroy
    @confirm.destroy
    redirect_to confirms_url, notice: 'Confirm was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_confirm
      @confirm = Confirm.find(params[:id])
    end

    def set_respond
      respond_to do |format|
        format.html
        format.json { render :json => @confirm }
        format.xml  { render :xml => @confirm }
      end
    end
    # Only allow a trusted parameter "white list" through.
    def confirm_params
      params.require(:confirm).permit(:code, :name, :companion, {:childs => []}, :allergic, :comment)
    end
end
